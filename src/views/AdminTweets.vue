<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar :isAdmin="isAdmin" />
    <div class="admin-tweets">
      <div class="admin-tweets-container">
        <div class="admin-tweets-title">
          <p>推文清單</p>
        </div>
        <!-- list -->
        <div class="user-tweet" v-for="tweet in adminTweets" :key="tweet.id">
          <div class="tweet-list-container">
            <div class="profile-image">
              <img :src="tweet.User.avatar" class="user-img" alt="" />
            </div>
            <div class="tweet">
              <router-link :to="{ name: 'tweet', params: { id: tweet.id } }">
                <div class="tweet-info">
                  <router-link
                    :to="{
                      name: 'user-profile',
                      params: { id: tweet.User.id },
                    }"
                    class="user-name-link"
                  >
                    <div class="user-name">username</div>
                  </router-link>
                  <div class="user-account">{{ tweet.User.account }}</div>
                  <div class="create-time">
                    ．{{ tweet.createdAt | fromNow }}
                  </div>
                </div>
              </router-link>
              <div class="tweet-content">
                {{ tweet.description }}
              </div>
            </div>
            <div class="delete-tweet">
              <div class="delete-container" @click="deleteTweet(tweet.id)">
                <img
                  src="https://i.imgur.com/puB9wJ7.png"
                  class="delete-icon"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import { fromNowFilter } from "./../utils/mixins";
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
    isLiked: false,
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
    isLiked: false,
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
  mixins: [fromNowFilter],
  components: {
    Sidebar,
  },
  data() {
    return {
      isAdmin: true,
      adminTweets: [],
    };
  },
  created() {
    this.fetchAdminTweets();
  },
  methods: {
    fetchAdminTweets() {
      this.adminTweets = dummyTweets;
    },
    deleteTweet(id) {
      this.adminTweets = this.adminTweets.filter((tweet) => tweet.id !== id);
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
.admin-tweets {
  width: auto;
  height: 100%;
  flex: 1;
  border-left: 1px solid #e6ecf0;
}

.admin-tweets-title {
  font-size: 18px;
  font-weight: 700;
  width: auto;
  height: 55px;
  border: 1px solid #e6ecf0;
}
.admin-tweets-title p {
  line-height: 55px;
  margin-left: 15px;
}

/* tweewts */

.user-tweet {
  width: auto;
  height: auto;
}
.tweet-list-container {
  width: auto;
  height: auto;
  border: 1px solid #e6ecf0;
  display: flex;
  padding-top: 10px;
}
.tweet-info {
  display: flex;
  flex-direction: row;
}
.user-name {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
}
.user-name-link:hover {
  text-decoration: underline;
}
.user-account,
.create-time {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.tweet {
  display: flex;
  flex-direction: column;
}
.tweet-content {
  width: 902px;
  height: auto;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 20px;
}
.profile-image {
  width: 70px;
  height: auto;
  display: flex;
  justify-content: center;
}
.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.delete-tweet {
  width: auto;
  flex: 1;
  margin-left: 90px;
  position: relative;
}
.delete-container:hover {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgb(192, 192, 192, 0.3);
}
.delete-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 4.6px;
  left: 6px;
}
</style>