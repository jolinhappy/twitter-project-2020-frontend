<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" />
    <div class="main-profile">
      <UserProfileCard
        @showEditModal="showEditModal"
        :user="user"
        :followers="followers"
        :followings="followings"
        :tweets="tweets"
        :isMyself="isMyself"
        :isFollowed="isFollowed"
      />
      <UserTweetsList
        @showReplyModal="showReplyModal"
        :pageMode="pageMode"
        :tweets="tweets"
      />
    </div>
    <div class="follow-top">
      <FollowTopList />
    </div>
    <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
      :initial-description="description"
      @afterSubmit="creatTweetFromModal"
    />
    <TweetReplyModal
      v-if="replyModal"
      @after-click-close-reply="closeReplyModal"
      :tweet="tweet"
    />
    <UserProfileEditModal
      v-if="editModal"
      @after-click-close-edit="closeEditModal"
      :initialUser="user"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
import UserProfileEditModal from "./../components/UserProfileEditModal";
import UserProfileCard from "./../components/UserProfileCard";
import { v4 as uuidv4 } from "uuid";

const dummyCurrentUser = {
  currentUser: {
    id: 1,
    name: "dummy",
    account: "@dummy",
    email: "123@hhhh.com",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
  },
  isAuthenticated: true,
};
const dummyUser = {
  id: 2,
  email: "user1@example.com",
  password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
  name: "user1",
  avatar:
    "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
  introduction: "I am user1",
  role: "user",
  account: "@user1",
  cover: "http://lorempixel.com/640/480/abstract",
  createdAt: "2020-10-01T08:02:45.000Z",
  updatedAt: "2020-10-01T08:02:45.000Z",
  Followers: [
    {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/food",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
      Followship: {
        followerId: 3,
        followingId: 2,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    },
    {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/noufalibrahim/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/food",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
      Followship: {
        followerId: 5,
        followingId: 2,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    },
  ],
  Followings: [
    {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/food",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
      Followship: {
        followerId: 2,
        followingId: 3,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    },
    {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/nature",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
      Followship: {
        followerId: 2,
        followingId: 4,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    },
  ],
  isMyself: false,
  isFollowed: false,
};

//TODO:用API帶入id拿對應使用這的資料
const dummyTweets = [
  {
    id: 1,
    UserId: 2,
    description: "ex",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 1,
        UserId: 4,
        TweetId: 1,
        comment: "ex voluptas odit",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 2,
        UserId: 3,
        TweetId: 1,
        comment: "sit error et",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 3,
        UserId: 5,
        TweetId: 1,
        comment: "voluptates est omnis",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [
      {
        id: 1,
        UserId: 2,
        TweetId: 1,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
      {
        id: 3,
        UserId: 3,
        TweetId: 1,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
      {
        id: 4,
        UserId: 6,
        TweetId: 1,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    ],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: false,
  },
  {
    id: 2,
    UserId: 2,
    description: "Molestias maxime dolorem culpa reprehenderit.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 4,
        UserId: 6,
        TweetId: 2,
        comment: "Ullam quos aut sit ab.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 5,
        UserId: 3,
        TweetId: 2,
        comment: "ut",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 6,
        UserId: 2,
        TweetId: 2,
        comment:
          "In harum eligendi eum quasi iusto. Nihil aliquam itaque quidem dolorem vel fuga nulla facere. Amet ipsum explicabo aspernatur animi. Est nulla quia ex quia quia dolores est voluptatem. Neque fuga eum qui adipisci. Omnis doloribus harum aliquid.\n \rNihil accusamus culpa cum neque optio et dolorem sunt. Ut iusto quia quo est enim. Ut et sint vitae. Quas necessitatibus voluptatum commodi est suscipit atque ut exercitationem. Officia deleniti reiciendis quis qui occaecati.\n \rDolores quasi et quis et et facilis. Ut qui expedita autem accusantium corporis eligendi. Recusandae aut nam itaque laboriosam maxime aut.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: false,
  },
  {
    id: 3,
    UserId: 2,
    description: "sit",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 7,
        UserId: 2,
        TweetId: 3,
        comment:
          "Laborum dolorem repudiandae debitis dolorem optio.\nAut illum doloribus quia tempore unde tempore nobis.\nOdit facilis ut vel eligendi aut veritatis.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 8,
        UserId: 6,
        TweetId: 3,
        comment: "nostrum",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 9,
        UserId: 3,
        TweetId: 3,
        comment: "eius",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: true,
  },
  {
    id: 4,
    UserId: 2,
    description:
      "Magnam ea modi est ut unde nemo repellat.\nDolores adipisci nesciunt vel aliquid.\nTotam molestiae eos numquam.\nQuia pariatur est nihil aut dolorem aut vitae qui est.\nVoluptatem culpa non.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 10,
        UserId: 4,
        TweetId: 4,
        comment: "Minima quo consequatur.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 11,
        UserId: 2,
        TweetId: 4,
        comment:
          "Officia qui dignissimos. Aut velit ea voluptates non quas. Quaerat voluptate commodi.\n \rNumquam ratione minima quia fugiat enim. Aliquid ut praesentium. Mollitia sint ut deserunt quasi omnis est eius veritatis praesentium. Ullam doloremque consequatur. Aliquam qui non enim similique quis ab. Explicabo pariatur aut optio.\n \rLaborum dolores et incidunt. Sed nihil voluptas. Fugit culpa ipsam eligendi omnis voluptatem rerum. Similique ducimus qui in omnis. Dolor recusandae quo ipsam quae enim pariatur est. Repellat nam qui.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 12,
        UserId: 3,
        TweetId: 4,
        comment:
          "Repudiandae ut delectus necessitatibus. Assumenda ut aut ipsam quidem odio similique harum magnam. Repellat est animi sunt veritatis et quia consequatur. Deserunt explicabo et eum est quaerat rem. Officia aspernatur quos.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [
      {
        id: 8,
        UserId: 5,
        TweetId: 4,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    ],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: true,
  },
  {
    id: 5,
    UserId: 2,
    description: "qui",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 13,
        UserId: 6,
        TweetId: 5,
        comment:
          "Provident dolores et aperiam. Aspernatur nobis temporibus doloribus accusamus dicta et. Corrupti dolorem aut debitis enim deleniti beatae tenetur voluptatem. Quas ut magni non distinctio commodi. Illum architecto culpa autem fuga. Dolores minus repudiandae quaerat provident vel id culpa.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 14,
        UserId: 5,
        TweetId: 5,
        comment:
          "Ea sed ipsa qui et ex quaerat et voluptas quia. Possimus rerum hic iste. Quo velit dolorem asperiores eligendi cupiditate.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 15,
        UserId: 2,
        TweetId: 5,
        comment:
          "Accusantium a aut quia pariatur minima distinctio. Et qui consequuntur velit eos nihil architecto sint quasi. Ea ullam autem libero qui aut molestiae rerum.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: false,
  },
  {
    id: 6,
    UserId: 2,
    description:
      "Distinctio eos dignissimos nisi voluptas. Quidem illum ipsa. Impedit non neque iste nisi modi. Quia est odit nisi sint excepturi accusantium quas. Aut et impedit voluptatem dolorem. Optio illo aut fugiat rerum voluptatum error aut neque consequatur.\n \rRecusandae dolores praesentium voluptatum eum officiis. Perspiciatis id ea non rerum dignissimos ducimus omnis et sit. Vel vel mollitia quis et sit occaecati.\n \rAut perferendis et. Perspiciatis voluptate laudantium iure tempora beatae qui odit ea soluta. Culpa magni temporibus voluptatem qui adipisci autem libero quo dicta. Odit sed in aperiam vitae iure aut beatae. Quidem inventore vel harum quo quisquam eligendi maiores illum quo.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 16,
        UserId: 3,
        TweetId: 6,
        comment: "Numquam odit expedita voluptatem quae qui.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 17,
        UserId: 4,
        TweetId: 6,
        comment: "qui",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 18,
        UserId: 6,
        TweetId: 6,
        comment: "porro",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: false,
  },
  {
    id: 7,
    UserId: 2,
    description:
      "Ratione assumenda similique. Id voluptate eveniet eum et voluptate. Assumenda ut ducimus laborum sapiente. Qui ut accusamus adipisci laudantium debitis molestias. Itaque sint error autem sed sapiente a ut possimus. Aut magni distinctio et.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 19,
        UserId: 4,
        TweetId: 7,
        comment: "non non ut",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 20,
        UserId: 2,
        TweetId: 7,
        comment:
          "Et consectetur animi ducimus. Dolorem nam deserunt temporibus voluptate amet qui ut ducimus. Maiores voluptatem ea praesentium.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 21,
        UserId: 5,
        TweetId: 7,
        comment:
          "Nobis sed eveniet earum rerum. Aliquid id odit quo delectus sunt optio ipsum facere culpa. Voluptatem sint et magnam quo non maiores eveniet et et.\n \rEst facilis quasi occaecati cum dolorem pariatur. Et est ipsum occaecati. Porro et quis fugiat eum. Magnam pariatur eum. Rem adipisci ut minima repellat incidunt est sequi accusantium. A vel in aspernatur consequatur.\n \rRerum est dicta nesciunt omnis numquam. Accusantium sed voluptates aut nobis quia. Delectus ad vel. Pariatur eveniet vitae.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: false,
  },
  {
    id: 8,
    UserId: 2,
    description:
      "Velit pariatur at est accusantium. Harum provident corrupti qui et eius quis maxime eveniet. Possimus repellendus accusantium impedit hic libero inventore. Deleniti perferendis impedit earum.\n \rDolores eius atque sed qui. Ab qui minus voluptatem dolore. Maiores doloremque suscipit aliquid temporibus reiciendis sit placeat. Et rem blanditiis tempora et qui et dolore. Voluptatem alias sit ipsam.\n \rVoluptatem rerum suscipit nemo et consequatur cupiditate. Repellat in corporis animi distinctio. Ducimus aut est et.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 22,
        UserId: 2,
        TweetId: 8,
        comment:
          "Sequi voluptate est fuga. Occaecati expedita laboriosam nisi corporis doloribus. Laudantium voluptatibus similique molestiae et. Error rerum et quia eaque est repellendus officiis et.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 23,
        UserId: 6,
        TweetId: 8,
        comment: "id cupiditate mollitia",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 24,
        UserId: 4,
        TweetId: 8,
        comment:
          "Molestiae voluptatem tempore possimus pariatur. Similique numquam natus atque non rerum tempore. Ab rerum qui recusandae nisi ullam. Id earum in unde illum ut. Aut autem at in voluptas tempore cupiditate rem quia mollitia. Aut expedita eum aspernatur sunt beatae sequi et.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: false,
  },
  {
    id: 9,
    UserId: 2,
    description: "quis beatae qui",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 25,
        UserId: 6,
        TweetId: 9,
        comment: "Ab tenetur odit asperiores ut.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 26,
        UserId: 5,
        TweetId: 9,
        comment:
          "Deleniti ut consequatur aut harum quis rem dolorem. Repellendus iste illum. Aut delectus praesentium officiis cupiditate eos pariatur pariatur cupiditate. Harum similique voluptatem libero quidem ea enim.\n \rEst esse aperiam. Et praesentium consequatur et fuga omnis numquam repellendus error. Accusamus eligendi quasi. Pariatur voluptas et perferendis. Pariatur architecto esse aliquam et ratione molestiae consectetur numquam mollitia.\n \rCorrupti enim sapiente. Provident voluptatem et. Officia tempore quis aut perferendis. Provident pariatur ea quae aut. Minima eaque nemo repudiandae. Quos harum cumque sed unde.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 27,
        UserId: 3,
        TweetId: 9,
        comment:
          "Eius eos in. Rerum qui est ad. Aut autem delectus repellat modi perferendis. Libero molestiae autem modi reprehenderit iste quod et vel. Ipsum libero id molestiae praesentium aliquam quis velit. Quo expedita nesciunt nam ut corporis expedita.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: false,
  },
  {
    id: 10,
    UserId: 2,
    description: "facere quas et",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Replies: [
      {
        id: 28,
        UserId: 5,
        TweetId: 10,
        comment:
          "Debitis tempora explicabo. Modi omnis pariatur sed consequuntur. Non a voluptas porro enim. Aut ipsa quia quisquam ad illum laboriosam molestiae dolor. Dolor est sed culpa ad fugiat harum iure in a. Et aperiam maiores.\n \rNumquam molestiae cum sed dignissimos rerum dolorem possimus. Commodi rerum voluptas. Voluptatibus nemo magnam mollitia vel voluptatem inventore nihil aut sint. Inventore et ipsa maxime.\n \rVeniam eaque laudantium rerum corporis corporis. Modi molestiae debitis aliquam illum aperiam nulla quas numquam voluptas. Delectus ratione magni assumenda.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 29,
        UserId: 2,
        TweetId: 10,
        comment: "sed sunt optio",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 30,
        UserId: 4,
        TweetId: 10,
        comment: "Eos eius laudantium ipsum dolor.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [],
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
    },
    isLiked: false,
  },
];

export default {
  name: "UserProfile",
  components: {
    Sidebar,
    UserTweetsList,
    FollowTopList,
    TweetCreateModal,
    TweetReplyModal,
    UserProfileEditModal,
    UserProfileCard,
  },
  data() {
    return {
      createModal: false,
      replyModal: false,
      editModal: false,
      pageMode: "main",
      tweets: [],
      currentUser: {},
      description: "",
      user: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        cover: "",
        introduction: "",
      },
      followers: [],
      followings: [],
      isMyself: false,
      isFollowed: false,
    };
  },
  created() {
    this.fetchCurrentUser();
    this.fetchUserTweets();
    this.fetchUser();
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    CreateFinish() {
      this.$router.push({ name: "tweets-home" });
    },
    showReplyModal() {
      this.replyModal = true;
    },
    closeReplyModal() {
      this.replyModal = false;
    },
    showEditModal() {
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
    },
    fetchCurrentUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyCurrentUser.currentUser,
      };
      this.isAuthenticated = dummyCurrentUser.isAuthenticated;
    },
    //需要傳入使用者id的API，用params取得id在於fetch時帶入
    fetchUserTweets() {
      this.tweets = dummyTweets;
    },
    fetchUser() {
      const {
        id,
        name,
        account,
        avatar,
        cover,
        introduction,
        isMyself,
        isFollowed,
      } = dummyUser;
      this.user = {
        ...this.user,
        id,
        name,
        account,
        avatar,
        cover,
        introduction,
      };
      this.followers = dummyUser.Followers;
      this.followings = dummyUser.Followings;
      this.isMyself = isMyself;
      this.isFollowed = isFollowed;
    },
    handleAfterSubmit(formData) {
      console.log(formData);
      for (let [name, value] of formData.entries()) {
        console.log(name + ":" + value);
      }
    },
    creatTweetFromModal(newDescription) {
      console.log("new", newDescription);
      this.tweets.push({
        id: uuidv4(),
        userId: this.currentUser.id,
        createdAt: new Date(),
        description: newDescription,
        User: {
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
        },
      });
      this.CreateFinish();
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.main-profile {
  width: 600px;
  height: 100%;
}

.back-button {
  height: 55px;
}
.profile-content {
  width: 600px;
  border: 1px solid #e5e5e5;
  position: relative;
}
.back-img {
  width: 24px;
  height: 24px;
  display: inline;
  margin: auto 15px;
  margin-top: 15px;
}
.info-title {
  font-size: 18px;
  font-weight: 700;
  width: 600px;
  height: 55px;
  border: 1px solid #e6ecf0;
  display: flex;
}

.profile-image {
  width: 70px;
  height: 120px;
}

.name {
  font-size: 19px;
  font-weight: 900;
  margin-top: 5px;
}
.tweets-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}
.cover-part {
  width: 598px;
  display: flex;
  align-items: center;
}
.cover-img {
  width: 600px;
  height: 200px;
}
.user-img-part {
  background: #ffffff;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  left: 15px;
  bottom: 195px;
}
.user-main-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
}

.detail-info-part {
  width: 600px;
  height: 230px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.button-part {
  width: 600px;
  display: flex;
  margin-left: -35px;
  justify-content: flex-end;
  margin-top: 10px;
}
.edit-info {
  width: 122px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ff6600;
  border-radius: 100px;
  color: #ff6600;
}
.message-icon,
.notice-icon {
  width: 40px;
  height: 40px;
}
.following {
  width: 92px;
  height: 40px;
  background: #ff6600;
  font-weight: bold;
  font-size: 15px;
  color: white;
  border-radius: 100px;
}
.name-info {
  margin-top: 30px;
  margin-bottom: 10px;
}
.user-name {
  font-size: 19px;
  font-weight: 900;
}
.user-account {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.discription {
  line-height: 20px;
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
}

.follow-info {
  display: flex;
  font-size: 14px;
  font-weight: 500;
}
.followings {
  margin-right: 20px;
}
</style>