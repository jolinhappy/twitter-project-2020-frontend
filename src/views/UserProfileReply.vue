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
        :likePage="likePage"
        :pageMode="pageMode"
        :tweets="tweets"
      />
    </div>
    <div class="follow-top">
      <FollowTopList :pageMode="pageMode" :tweets="tweets" />
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
    />
    <UserProfileEditModal
      v-if="editModal"
      @after-click-close-edit="closeEditModal"
      :initialUser="user"
    />
  </div>
</template>


<script>
const dummyTweetsReply = [
  {
    id: 6,
    UserId: 2,
    TweetId: 2,
    comment:
      "In harum eligendi eum quasi iusto. Nihil aliquam itaque quidem dolorem vel fuga nulla facere. Amet ipsum explicabo aspernatur animi. Est nulla quia ex quia quia dolores est voluptatem. Neque fuga eum qui adipisci. Omnis doloribus harum aliquid.\n \rNihil accusamus culpa cum neque optio et dolorem sunt. Ut iusto quia quo est enim. Ut et sint vitae. Quas necessitatibus voluptatum commodi est suscipit atque ut exercitationem. Officia deleniti reiciendis quis qui occaecati.\n \rDolores quasi et quis et et facilis. Ut qui expedita autem accusantium corporis eligendi. Recusandae aut nam itaque laboriosam maxime aut.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
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
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
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
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 7,
    UserId: 2,
    TweetId: 3,
    comment:
      "Laborum dolorem repudiandae debitis dolorem optio.\nAut illum doloribus quia tempore unde tempore nobis.\nOdit facilis ut vel eligendi aut veritatis.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
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
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
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
      Likes: [],
    },
    isLiked: true,
  },
  {
    id: 11,
    UserId: 2,
    TweetId: 4,
    comment:
      "Officia qui dignissimos. Aut velit ea voluptates non quas. Quaerat voluptate commodi.\n \rNumquam ratione minima quia fugiat enim. Aliquid ut praesentium. Mollitia sint ut deserunt quasi omnis est eius veritatis praesentium. Ullam doloremque consequatur. Aliquam qui non enim similique quis ab. Explicabo pariatur aut optio.\n \rLaborum dolores et incidunt. Sed nihil voluptas. Fugit culpa ipsam eligendi omnis voluptatem rerum. Similique ducimus qui in omnis. Dolor recusandae quo ipsam quae enim pariatur est. Repellat nam qui.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
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
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
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
      Likes: [
        {
          id: 8,
          UserId: 5,
          TweetId: 4,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      ],
    },
    isLiked: false,
  },
  {
    id: 15,
    UserId: 2,
    TweetId: 5,
    comment:
      "Accusantium a aut quia pariatur minima distinctio. Et qui consequuntur velit eos nihil architecto sint quasi. Ea ullam autem libero qui aut molestiae rerum.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
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
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
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
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 20,
    UserId: 2,
    TweetId: 7,
    comment:
      "Et consectetur animi ducimus. Dolorem nam deserunt temporibus voluptate amet qui ut ducimus. Maiores voluptatem ea praesentium.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
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
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
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
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 22,
    UserId: 2,
    TweetId: 8,
    comment:
      "Sequi voluptate est fuga. Occaecati expedita laboriosam nisi corporis doloribus. Laudantium voluptatibus similique molestiae et. Error rerum et quia eaque est repellendus officiis et.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
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
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
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
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 29,
    UserId: 2,
    TweetId: 10,
    comment: "sed sunt optio",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
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
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
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
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 35,
    UserId: 2,
    TweetId: 12,
    comment:
      "Et aut distinctio non iste quae voluptas sed. Aut et et autem velit ut pariatur quia. Cupiditate est voluptas illo non.\n \rQuia et velit rerum atque quasi porro voluptatem. Modi consequatur totam laudantium voluptatem. Dolorum qui nisi et sit harum et nobis. Sit ad natus natus quia reiciendis facilis et. Enim beatae culpa quisquam neque.\n \rMaxime veritatis ducimus repellat dicta quod dolorem voluptatum cupiditate. Sunt doloremque in quo impedit et. Consectetur dolore in voluptatibus cum ut ut optio aliquam.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 12,
      UserId: 3,
      description: "possimus",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 34,
          UserId: 4,
          TweetId: 12,
          comment: "velit",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 35,
          UserId: 2,
          TweetId: 12,
          comment:
            "Et aut distinctio non iste quae voluptas sed. Aut et et autem velit ut pariatur quia. Cupiditate est voluptas illo non.\n \rQuia et velit rerum atque quasi porro voluptatem. Modi consequatur totam laudantium voluptatem. Dolorum qui nisi et sit harum et nobis. Sit ad natus natus quia reiciendis facilis et. Enim beatae culpa quisquam neque.\n \rMaxime veritatis ducimus repellat dicta quod dolorem voluptatum cupiditate. Sunt doloremque in quo impedit et. Consectetur dolore in voluptatibus cum ut ut optio aliquam.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 36,
          UserId: 3,
          TweetId: 12,
          comment:
            "Minima ex et consequatur voluptas dolores et ab doloribus et.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
        name: "user2",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
        introduction: "I am user2",
        role: "user",
        account: "@user2",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 39,
    UserId: 2,
    TweetId: 13,
    comment:
      "Vel sunt explicabo ducimus saepe asperiores tempora ducimus dolor minima.\nEaque voluptatem ut minima nihil cumque delectus aut neque fuga.\nHarum eos nulla et doloribus quidem eveniet.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 13,
      UserId: 3,
      description: "non",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 37,
          UserId: 4,
          TweetId: 13,
          comment:
            "Sequi fugiat iste vel dolore. Voluptatibus sapiente eum omnis esse. Saepe accusamus sed architecto libero. Alias ratione deleniti ipsam. Sint totam dolor sed velit.\n \rOdit omnis consequatur et reiciendis. Odio aut ut assumenda cum ut sit cumque enim nemo. Quos a et. Pariatur nam nisi quia consequatur nobis.\n \rCupiditate qui ducimus dicta earum sit. Quo quia cupiditate est suscipit debitis vel est nobis voluptates. Voluptas cupiditate nulla et sunt possimus tempora et. Qui non sed corrupti laboriosam ipsum molestiae ad blanditiis quo.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 38,
          UserId: 5,
          TweetId: 13,
          comment:
            "Quia dolorem sed tempore molestiae quibusdam quaerat nisi. Ex aliquam asperiores sunt deserunt cumque corrupti. Culpa odio cumque dicta minus eum ut aut odio. Sunt fugit odit modi aut harum aut itaque.\n \rUnde autem inventore est assumenda excepturi nostrum quidem voluptatem. Alias architecto illo illo voluptatum corporis. Corrupti est asperiores a aspernatur quis laborum.\n \rTempore sunt totam quas dolor. Ab at cum corporis natus autem. Qui dolorum sit quam consequuntur sint debitis tempora vitae. Excepturi recusandae sunt cum qui magnam ut temporibus dolorem animi. Quasi ullam at est fuga temporibus beatae doloremque.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 39,
          UserId: 2,
          TweetId: 13,
          comment:
            "Vel sunt explicabo ducimus saepe asperiores tempora ducimus dolor minima.\nEaque voluptatem ut minima nihil cumque delectus aut neque fuga.\nHarum eos nulla et doloribus quidem eveniet.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
        name: "user2",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
        introduction: "I am user2",
        role: "user",
        account: "@user2",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 40,
    UserId: 2,
    TweetId: 14,
    comment:
      "Quia earum quia. Excepturi perspiciatis quia laboriosam est fugit. Harum perspiciatis ex vitae voluptatem saepe voluptatem tempora quia. Molestias omnis ab ipsum iusto. Est expedita id atque quibusdam alias.\n \rConsequatur corrupti odio laborum non voluptatibus voluptate. Est error id. Doloremque error rem quia. Qui sit autem consectetur consequatur autem voluptate id eos libero. Molestiae nobis natus dolores aut quos et.\n \rAut temporibus tempora aliquam laborum voluptate dicta quae aut molestias. Inventore non dolores omnis non alias et nihil possimus necessitatibus. Odit non soluta voluptates veritatis odio dolor sed molestiae architecto.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 14,
      UserId: 3,
      description:
        "Magnam voluptate eveniet corrupti ea qui maiores. Earum maiores et non accusantium cumque autem voluptate nam est. Ut labore iusto deserunt. Expedita sapiente ipsum sit reprehenderit odit eius deleniti harum.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 40,
          UserId: 2,
          TweetId: 14,
          comment:
            "Quia earum quia. Excepturi perspiciatis quia laboriosam est fugit. Harum perspiciatis ex vitae voluptatem saepe voluptatem tempora quia. Molestias omnis ab ipsum iusto. Est expedita id atque quibusdam alias.\n \rConsequatur corrupti odio laborum non voluptatibus voluptate. Est error id. Doloremque error rem quia. Qui sit autem consectetur consequatur autem voluptate id eos libero. Molestiae nobis natus dolores aut quos et.\n \rAut temporibus tempora aliquam laborum voluptate dicta quae aut molestias. Inventore non dolores omnis non alias et nihil possimus necessitatibus. Odit non soluta voluptates veritatis odio dolor sed molestiae architecto.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 41,
          UserId: 3,
          TweetId: 14,
          comment: "Ex voluptatum veritatis dicta velit.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 42,
          UserId: 4,
          TweetId: 14,
          comment: "harum",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
        name: "user2",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
        introduction: "I am user2",
        role: "user",
        account: "@user2",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 44,
    UserId: 2,
    TweetId: 15,
    comment:
      "Quibusdam est ut debitis alias quae voluptas voluptas assumenda animi. Aspernatur ut et rem sit est. Nostrum ratione cum tenetur non. Neque rerum mollitia doloremque. Maiores ex esse ratione eius magni.\n \rVel incidunt facilis ut omnis. Hic omnis tempora sit enim officia suscipit. Recusandae officiis sint veritatis consequatur atque aliquid. Numquam facilis quaerat animi explicabo reiciendis fuga molestiae voluptatum.\n \rDignissimos enim cum architecto hic. Sed sint iste quas aliquam dolorem voluptatibus. At eveniet doloremque quidem placeat dolorem recusandae.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 15,
      UserId: 3,
      description:
        "Modi sint optio impedit inventore est eius. Reiciendis eligendi iste voluptate tenetur aut. Beatae cumque est nobis odit sed quae. Et aliquid commodi ab sit consequatur possimus magni. Totam soluta rerum.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 43,
          UserId: 6,
          TweetId: 15,
          comment: "Ut doloremque temporibus saepe.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 44,
          UserId: 2,
          TweetId: 15,
          comment:
            "Quibusdam est ut debitis alias quae voluptas voluptas assumenda animi. Aspernatur ut et rem sit est. Nostrum ratione cum tenetur non. Neque rerum mollitia doloremque. Maiores ex esse ratione eius magni.\n \rVel incidunt facilis ut omnis. Hic omnis tempora sit enim officia suscipit. Recusandae officiis sint veritatis consequatur atque aliquid. Numquam facilis quaerat animi explicabo reiciendis fuga molestiae voluptatum.\n \rDignissimos enim cum architecto hic. Sed sint iste quas aliquam dolorem voluptatibus. At eveniet doloremque quidem placeat dolorem recusandae.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 45,
          UserId: 3,
          TweetId: 15,
          comment: "et quam ut",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
        name: "user2",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
        introduction: "I am user2",
        role: "user",
        account: "@user2",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [
        {
          id: 7,
          UserId: 5,
          TweetId: 15,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      ],
    },
    isLiked: false,
  },
  {
    id: 47,
    UserId: 2,
    TweetId: 16,
    comment:
      "Voluptatem natus enim est. Omnis fuga deleniti sint mollitia sit maxime et similique rerum. Omnis dignissimos perferendis qui tempora dolorem iure et. Tempore aut et fugit et.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 16,
      UserId: 3,
      description: "unde",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 46,
          UserId: 5,
          TweetId: 16,
          comment: "reprehenderit",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 47,
          UserId: 2,
          TweetId: 16,
          comment:
            "Voluptatem natus enim est. Omnis fuga deleniti sint mollitia sit maxime et similique rerum. Omnis dignissimos perferendis qui tempora dolorem iure et. Tempore aut et fugit et.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 48,
          UserId: 6,
          TweetId: 16,
          comment: "Autem ipsa molestiae consectetur cum.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
        name: "user2",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
        introduction: "I am user2",
        role: "user",
        account: "@user2",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 52,
    UserId: 2,
    TweetId: 18,
    comment: "A minus et voluptatum excepturi.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 18,
      UserId: 3,
      description:
        "Et odit laborum reiciendis expedita autem. Eos laborum atque dignissimos quod est excepturi perspiciatis accusamus facere. Dolore enim quae ipsam nobis et animi voluptatum sint. Qui amet consequatur culpa libero qui quo eveniet omnis. Dolorem et sit illo. Nisi ullam temporibus ducimus tempore.\n \rRepellat blanditiis quidem. Quia molestias asperiores eos asperiores. Ratione aut aliquam soluta voluptatum et quo autem ea iusto. Corrupti qui ex assumenda corporis aut occaecati iusto perferendis. Dolor consequatur aliquid excepturi et sunt non.\n \rVelit dolor eos. Alias nulla harum voluptates deleniti adipisci qui aut eius est. Consequatur quia tempora dolores.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 52,
          UserId: 2,
          TweetId: 18,
          comment: "A minus et voluptatum excepturi.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 53,
          UserId: 5,
          TweetId: 18,
          comment: "Quisquam aut quas eos ea deserunt et repudiandae.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 54,
          UserId: 3,
          TweetId: 18,
          comment:
            "Fugiat provident temporibus veniam sint vitae quos modi. Autem sunt libero dolore vitae voluptatem nihil eos cupiditate placeat.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
        name: "user2",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
        introduction: "I am user2",
        role: "user",
        account: "@user2",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 56,
    UserId: 2,
    TweetId: 19,
    comment:
      "Ad quidem ad autem veniam in ut est. Sed aliquam et sed eos cum rerum deleniti. Natus ab quia. Distinctio officia culpa ullam ut dicta enim et. Est accusamus enim vero in error accusamus et labore.\n \rPerferendis nam numquam. Sint aut rerum vero. Quia libero quod quasi consequatur occaecati provident velit beatae consectetur. Voluptatem temporibus voluptas nesciunt modi et molestias hic deleniti. Sequi commodi et deleniti architecto quisquam qui officia enim.\n \rIn vitae dolore necessitatibus id harum. Sit pariatur iure asperiores eius quisquam quod similique laboriosam rerum. Libero totam voluptate qui ex sed. Ea quisquam qui. Necessitatibus doloremque nemo id placeat voluptate nulla quis. Accusantium minima enim reprehenderit expedita voluptas sed asperiores.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 19,
      UserId: 3,
      description:
        "Dolores dolore delectus vitae voluptates reiciendis delectus. Aperiam quis enim occaecati. Quo nemo nemo laudantium eos sint tenetur. Enim error ut rerum quia provident quia dolorem perferendis autem. Vitae necessitatibus minima ex aliquid totam saepe. Tempore iure consectetur temporibus culpa sit voluptas.\n \rMagni ut possimus molestias consequatur voluptatem dicta. Sit culpa ipsa laboriosam nostrum cupiditate architecto sunt veniam voluptatem. Illum nostrum ad sit molestiae commodi.\n \rOmnis dolorem omnis. Consequatur esse perferendis occaecati debitis. Eveniet id et voluptatibus quis accusantium vel nobis in. Perferendis ipsa incidunt qui at explicabo dolorem nisi omnis esse.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 55,
          UserId: 6,
          TweetId: 19,
          comment: "velit vel aliquam",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 56,
          UserId: 2,
          TweetId: 19,
          comment:
            "Ad quidem ad autem veniam in ut est. Sed aliquam et sed eos cum rerum deleniti. Natus ab quia. Distinctio officia culpa ullam ut dicta enim et. Est accusamus enim vero in error accusamus et labore.\n \rPerferendis nam numquam. Sint aut rerum vero. Quia libero quod quasi consequatur occaecati provident velit beatae consectetur. Voluptatem temporibus voluptas nesciunt modi et molestias hic deleniti. Sequi commodi et deleniti architecto quisquam qui officia enim.\n \rIn vitae dolore necessitatibus id harum. Sit pariatur iure asperiores eius quisquam quod similique laboriosam rerum. Libero totam voluptate qui ex sed. Ea quisquam qui. Necessitatibus doloremque nemo id placeat voluptate nulla quis. Accusantium minima enim reprehenderit expedita voluptas sed asperiores.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 57,
          UserId: 4,
          TweetId: 19,
          comment:
            "Voluptas explicabo cumque voluptates iste repellendus dolorum occaecati sed non. Quos quis ipsa voluptas eligendi amet. Quas rerum ratione voluptate eligendi dolorem quas. Eligendi delectus aperiam inventore sed maiores atque fuga. Et quas fuga dolorem dolorem sapiente. Fugiat modi est qui voluptates voluptatem eaque.\n \rAut similique commodi. Ut neque dolorem aut ullam officia et aperiam temporibus odit. Voluptates explicabo nihil qui et voluptatem aut ex occaecati. Aliquid consequatur saepe aliquam. Illo rerum incidunt optio qui sit consectetur voluptatem.\n \rEt et praesentium autem maiores nesciunt facilis aut et aperiam. Rerum voluptas eos eos culpa dolorum corporis cupiditate voluptatem non. Ut quisquam omnis qui commodi voluptatem minima enim quo suscipit.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
        name: "user2",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
        introduction: "I am user2",
        role: "user",
        account: "@user2",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 62,
    UserId: 2,
    TweetId: 21,
    comment:
      "Odio quia ipsum labore quis placeat et distinctio fuga. Aliquam neque enim doloribus. Et tempora vero nam in facilis occaecati fugit non. Maiores at aut facilis molestiae aut.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 21,
      UserId: 4,
      description: "porro",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 61,
          UserId: 5,
          TweetId: 21,
          comment: "fugiat",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 62,
          UserId: 2,
          TweetId: 21,
          comment:
            "Odio quia ipsum labore quis placeat et distinctio fuga. Aliquam neque enim doloribus. Et tempora vero nam in facilis occaecati fugit non. Maiores at aut facilis molestiae aut.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 63,
          UserId: 6,
          TweetId: 21,
          comment: "et",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
        name: "user3",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
        introduction: "I am user3",
        role: "user",
        account: "@user3",
        cover: "http://lorempixel.com/640/480/nature",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 65,
    UserId: 2,
    TweetId: 22,
    comment:
      "Architecto vel ad dolor.\nIn architecto consequatur velit molestiae aut et expedita.\nConsectetur ut voluptatem.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 22,
      UserId: 4,
      description: "id",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 64,
          UserId: 3,
          TweetId: 22,
          comment: "Autem qui magni aliquam modi necessitatibus.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 65,
          UserId: 2,
          TweetId: 22,
          comment:
            "Architecto vel ad dolor.\nIn architecto consequatur velit molestiae aut et expedita.\nConsectetur ut voluptatem.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 66,
          UserId: 4,
          TweetId: 22,
          comment: "ut",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
        name: "user3",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
        introduction: "I am user3",
        role: "user",
        account: "@user3",
        cover: "http://lorempixel.com/640/480/nature",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 67,
    UserId: 2,
    TweetId: 23,
    comment:
      "Officia sit ipsum rem et excepturi rem rerum tempore. Nihil aut ea. Pariatur repudiandae natus aut. Magni consequatur porro sit laboriosam eaque repellat.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 23,
      UserId: 4,
      description:
        "Voluptas at ipsum blanditiis. Iste quia sed unde quia accusantium ut aliquam. Qui cum delectus eaque. Omnis nemo autem quibusdam quod incidunt laboriosam. Exercitationem ex qui. Velit dolorem libero qui vel.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 67,
          UserId: 2,
          TweetId: 23,
          comment:
            "Officia sit ipsum rem et excepturi rem rerum tempore. Nihil aut ea. Pariatur repudiandae natus aut. Magni consequatur porro sit laboriosam eaque repellat.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 68,
          UserId: 4,
          TweetId: 23,
          comment:
            "Rerum ad aut enim praesentium. Hic quisquam deleniti omnis non vitae illum consequuntur. Ut aliquam recusandae est commodi culpa aliquid quis amet. Cumque occaecati sequi eum repudiandae beatae et cumque.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 69,
          UserId: 5,
          TweetId: 23,
          comment: "et",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
        name: "user3",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
        introduction: "I am user3",
        role: "user",
        account: "@user3",
        cover: "http://lorempixel.com/640/480/nature",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 70,
    UserId: 2,
    TweetId: 24,
    comment: "sed",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 24,
      UserId: 4,
      description: "sed",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 70,
          UserId: 2,
          TweetId: 24,
          comment: "sed",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 71,
          UserId: 3,
          TweetId: 24,
          comment: "Consectetur omnis cupiditate.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 72,
          UserId: 6,
          TweetId: 24,
          comment:
            "Sit sit maxime voluptas voluptatem quidem magnam facere. Voluptatem fuga iste vero illo. Commodi minima nemo sunt consequatur est sint dicta in quaerat. Ut et doloribus dolorem magnam repellendus. Ut excepturi illo autem facere et cumque sunt inventore esse. Rerum hic doloribus quia perspiciatis ut.\n \rDistinctio tempora totam. Eum aperiam libero cum necessitatibus dolor alias est fuga est. Sit et id magnam suscipit et. Beatae corporis et. Sunt illum illo quo voluptatem temporibus error similique. Molestiae iusto distinctio velit ducimus animi.\n \rDignissimos excepturi quam hic ea neque itaque. Aut sit reiciendis omnis reiciendis fugiat dignissimos iure et. At est possimus consequatur. Sapiente aut error sunt. Fuga voluptas doloribus est. Eius iusto consequuntur doloremque repellendus consectetur enim alias quasi incidunt.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
        name: "user3",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
        introduction: "I am user3",
        role: "user",
        account: "@user3",
        cover: "http://lorempixel.com/640/480/nature",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 75,
    UserId: 2,
    TweetId: 25,
    comment:
      "Qui ut incidunt. Laborum itaque et distinctio earum ad eos. Eum facere saepe dolor omnis est laborum eos ipsa iusto.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 25,
      UserId: 4,
      description:
        "Voluptas ipsam sit ipsa. Accusamus aperiam assumenda est alias magnam nulla quae ipsa. Fugiat numquam qui et. Laboriosam est eos fugit ipsum totam. Dolorem pariatur maiores sapiente deleniti autem deserunt dolorem. Quod voluptatum voluptates.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 73,
          UserId: 3,
          TweetId: 25,
          comment: "qui commodi quia",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 74,
          UserId: 5,
          TweetId: 25,
          comment:
            "Sed amet molestiae mollitia cum sed repudiandae rem autem. Dolor animi magni eum id a. Qui eum aut autem eos sed. In voluptas quo modi est aliquam.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 75,
          UserId: 2,
          TweetId: 25,
          comment:
            "Qui ut incidunt. Laborum itaque et distinctio earum ad eos. Eum facere saepe dolor omnis est laborum eos ipsa iusto.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
        name: "user3",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
        introduction: "I am user3",
        role: "user",
        account: "@user3",
        cover: "http://lorempixel.com/640/480/nature",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 76,
    UserId: 2,
    TweetId: 26,
    comment: "Totam rerum molestias.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 26,
      UserId: 4,
      description:
        "Excepturi exercitationem dolor consequatur dolorem qui. Veniam inventore odio earum optio. In aut eveniet rem numquam praesentium. Natus ut dolores explicabo omnis architecto recusandae tempore.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 76,
          UserId: 2,
          TweetId: 26,
          comment: "Totam rerum molestias.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 77,
          UserId: 4,
          TweetId: 26,
          comment:
            "Eos est numquam rerum dolorem ut ut voluptatum deleniti. Nobis ipsa corrupti occaecati voluptates. Animi consequatur porro occaecati. Officiis voluptate aut explicabo molestias porro tempora corrupti voluptatem dolorum. Quis quam ipsa sed amet. Doloribus rem veniam.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 78,
          UserId: 3,
          TweetId: 26,
          comment: "Molestiae quia suscipit enim architecto et.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
        name: "user3",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
        introduction: "I am user3",
        role: "user",
        account: "@user3",
        cover: "http://lorempixel.com/640/480/nature",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 80,
    UserId: 2,
    TweetId: 27,
    comment: "Commodi quam quisquam ipsum.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 27,
      UserId: 4,
      description:
        "Suscipit dolore quod sed.\nEa qui laboriosam rem ut quisquam aut incidunt nihil aspernatur.\nRepellat deleniti vel recusandae aut consequatur voluptatibus.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 79,
          UserId: 6,
          TweetId: 27,
          comment:
            "Tempore dolore rerum dolor. Occaecati debitis atque. Rerum aut ratione.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 80,
          UserId: 2,
          TweetId: 27,
          comment: "Commodi quam quisquam ipsum.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 81,
          UserId: 5,
          TweetId: 27,
          comment:
            "Enim maxime quia alias dolores expedita exercitationem. Quis consectetur earum aut. Natus iure nesciunt est repellendus.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
        name: "user3",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
        introduction: "I am user3",
        role: "user",
        account: "@user3",
        cover: "http://lorempixel.com/640/480/nature",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 89,
    UserId: 2,
    TweetId: 30,
    comment: "Excepturi in excepturi sed non laborum itaque.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 30,
      UserId: 4,
      description:
        "Omnis sapiente exercitationem similique ut molestias.\nEt delectus sed aspernatur sit.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 88,
          UserId: 3,
          TweetId: 30,
          comment: "doloremque nisi sit",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 89,
          UserId: 2,
          TweetId: 30,
          comment: "Excepturi in excepturi sed non laborum itaque.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 90,
          UserId: 4,
          TweetId: 30,
          comment:
            "Dolores sit sequi qui natus. Molestiae eligendi et voluptatem. Commodi iusto explicabo quibusdam aut. Aliquam sed illo voluptatem exercitationem enim aut eum totam est. Facere consequuntur eum eligendi inventore possimus nihil ad aliquam. Est dolore dolorum distinctio in ut et id voluptatibus totam.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
        name: "user3",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
        introduction: "I am user3",
        role: "user",
        account: "@user3",
        cover: "http://lorempixel.com/640/480/nature",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [
        {
          id: 5,
          UserId: 4,
          TweetId: 30,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      ],
    },
    isLiked: false,
  },
  {
    id: 96,
    UserId: 2,
    TweetId: 32,
    comment:
      "Et assumenda veniam eligendi nobis. Cumque perspiciatis corporis sit. Nemo voluptas autem omnis veniam minus odio eum qui libero. Perferendis laudantium sit eum velit. Maxime et quia quaerat quia. Eligendi commodi illum rem ipsa dolor voluptate aut.\n \rNihil at officiis. Quos delectus quia. Quis ipsam vel deserunt sunt est perferendis dolorem. Laudantium et vero voluptatem atque id harum.\n \rQuia expedita autem error sit. Quo fuga assumenda accusamus vel repudiandae. Similique molestiae temporibus. Voluptatibus unde aperiam et repudiandae. Officia non nostrum delectus. Necessitatibus sit at eius sit voluptate labore nihil rem soluta.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 32,
      UserId: 5,
      description: "Nostrum voluptatum minus nulla commodi.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 94,
          UserId: 5,
          TweetId: 32,
          comment:
            "Quisquam eos est perspiciatis corrupti nemo praesentium amet animi. Cum quia impedit quisquam mollitia. Provident rerum repellendus dolorem maxime sint. Reiciendis ad similique nemo quam neque illo voluptate.\n \rCorrupti harum eaque fugiat asperiores dolor sit aperiam necessitatibus. Ut pariatur voluptates dignissimos eum et voluptas. Reiciendis laudantium error reiciendis. Sed nemo aut non est porro eaque quasi velit. Est sequi incidunt quod itaque debitis sed consequatur. Nemo placeat nobis non quas iste assumenda cupiditate necessitatibus.\n \rPraesentium accusantium ipsa consequatur. Sint sed sequi inventore aspernatur suscipit non. Et omnis consectetur qui ut eum. Officia aut non quia temporibus nam quidem repudiandae quia asperiores. Et harum laboriosam non aut ut dolor minus. Neque quia voluptas et consequuntur sit eum inventore.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 95,
          UserId: 6,
          TweetId: 32,
          comment: "recusandae",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 96,
          UserId: 2,
          TweetId: 32,
          comment:
            "Et assumenda veniam eligendi nobis. Cumque perspiciatis corporis sit. Nemo voluptas autem omnis veniam minus odio eum qui libero. Perferendis laudantium sit eum velit. Maxime et quia quaerat quia. Eligendi commodi illum rem ipsa dolor voluptate aut.\n \rNihil at officiis. Quos delectus quia. Quis ipsam vel deserunt sunt est perferendis dolorem. Laudantium et vero voluptatem atque id harum.\n \rQuia expedita autem error sit. Quo fuga assumenda accusamus vel repudiandae. Similique molestiae temporibus. Voluptatibus unde aperiam et repudiandae. Officia non nostrum delectus. Necessitatibus sit at eius sit voluptate labore nihil rem soluta.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 5,
        email: "user4@example.com",
        password:
          "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
        name: "user4",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/noufalibrahim/128.jpg",
        introduction: "I am user4",
        role: "user",
        account: "@user4",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 105,
    UserId: 2,
    TweetId: 35,
    comment:
      "Saepe modi unde et quam a incidunt atque. Nobis nemo est magni qui quis. Odio quae et distinctio. Et facilis quis possimus voluptas vero tempora perspiciatis dicta occaecati.\n \rVeritatis hic dolor reiciendis hic ut voluptas voluptatibus animi. Doloribus doloribus sunt id ut. Consectetur qui non et.\n \rSunt voluptates amet amet aliquam nam vitae consectetur. Hic excepturi autem non dolores sint. Aut omnis nostrum culpa necessitatibus nam esse totam inventore aut. Voluptas optio quia quisquam cumque est aut fugit aut voluptatem. Similique nemo veniam. A omnis in reiciendis rerum neque laudantium enim.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 35,
      UserId: 5,
      description:
        "In autem beatae non excepturi atque nemo ea fuga cum. Ipsam labore dolores assumenda provident molestiae cupiditate. Sed velit delectus nulla. Totam consequatur deserunt non itaque maxime est accusantium repellat tempora. Omnis distinctio voluptate. Sit non perferendis voluptas.\n \rMollitia ut impedit esse labore hic rerum veniam incidunt. Dolorem et aperiam quia cum hic ut. Labore excepturi quia repellat neque numquam. Aliquid ab deleniti sit voluptates. Natus eos reiciendis sed eius doloremque officia ratione aliquid nobis. Eos aut soluta incidunt sed eius hic debitis suscipit odio.\n \rLaborum eius excepturi natus aliquam voluptatem omnis impedit qui. Optio laborum quidem perspiciatis. Et explicabo ut eius non. Et cupiditate repudiandae veritatis et natus aut id.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 103,
          UserId: 3,
          TweetId: 35,
          comment:
            "Qui eveniet placeat. Neque veritatis illum unde qui inventore. Omnis cum mollitia voluptas molestiae libero provident qui. Placeat est veniam. Laboriosam quisquam atque soluta quas eaque facere praesentium ut.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 104,
          UserId: 5,
          TweetId: 35,
          comment: "sed",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 105,
          UserId: 2,
          TweetId: 35,
          comment:
            "Saepe modi unde et quam a incidunt atque. Nobis nemo est magni qui quis. Odio quae et distinctio. Et facilis quis possimus voluptas vero tempora perspiciatis dicta occaecati.\n \rVeritatis hic dolor reiciendis hic ut voluptas voluptatibus animi. Doloribus doloribus sunt id ut. Consectetur qui non et.\n \rSunt voluptates amet amet aliquam nam vitae consectetur. Hic excepturi autem non dolores sint. Aut omnis nostrum culpa necessitatibus nam esse totam inventore aut. Voluptas optio quia quisquam cumque est aut fugit aut voluptatem. Similique nemo veniam. A omnis in reiciendis rerum neque laudantium enim.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 5,
        email: "user4@example.com",
        password:
          "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
        name: "user4",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/noufalibrahim/128.jpg",
        introduction: "I am user4",
        role: "user",
        account: "@user4",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 108,
    UserId: 2,
    TweetId: 36,
    comment: "est",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 36,
      UserId: 5,
      description:
        "Voluptate eligendi placeat autem non.\nDoloribus perferendis ullam molestiae accusamus vel amet similique quidem harum.\nPerferendis fuga recusandae.\nSaepe occaecati quos sit aut reiciendis officia iste.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 106,
          UserId: 3,
          TweetId: 36,
          comment: "Iste eius nisi quos eos saepe magnam.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 107,
          UserId: 5,
          TweetId: 36,
          comment: "odio",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 108,
          UserId: 2,
          TweetId: 36,
          comment: "est",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 5,
        email: "user4@example.com",
        password:
          "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
        name: "user4",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/noufalibrahim/128.jpg",
        introduction: "I am user4",
        role: "user",
        account: "@user4",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 113,
    UserId: 2,
    TweetId: 38,
    comment:
      "Quod culpa vero facilis eos voluptates animi. Sunt consequatur molestiae quibusdam distinctio corporis delectus rerum sed.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 38,
      UserId: 5,
      description:
        "Ea quod repudiandae velit ut earum quibusdam accusantium maiores. Nemo velit quibusdam ipsum laudantium et adipisci qui quod. Tempore qui eveniet eveniet tempore quo. Ab quod cumque autem sed.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 112,
          UserId: 4,
          TweetId: 38,
          comment: "cumque tenetur dolorem",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 113,
          UserId: 2,
          TweetId: 38,
          comment:
            "Quod culpa vero facilis eos voluptates animi. Sunt consequatur molestiae quibusdam distinctio corporis delectus rerum sed.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 114,
          UserId: 6,
          TweetId: 38,
          comment: "et",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 5,
        email: "user4@example.com",
        password:
          "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
        name: "user4",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/noufalibrahim/128.jpg",
        introduction: "I am user4",
        role: "user",
        account: "@user4",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 120,
    UserId: 2,
    TweetId: 40,
    comment:
      "Ut dignissimos omnis. Vitae iste et non illum culpa sit. Quasi deserunt corrupti et est velit debitis quasi a fugiat. Inventore doloribus iusto. Sed voluptatem magni deserunt. Esse impedit iure quidem nulla magnam quidem non adipisci.\n \rEt ullam consectetur modi eos rerum qui qui doloremque quia. Quia facere esse totam repellat quae alias. Consequatur soluta omnis distinctio rerum repellendus qui.\n \rQuo earum explicabo dolorem sit. Architecto perspiciatis maiores ea molestiae quia voluptates. Beatae aut est. Id enim culpa maiores voluptas incidunt architecto.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 40,
      UserId: 5,
      description:
        "Illo aut debitis est perferendis. Eius veritatis quia odit ipsam commodi qui. Est quis iste est. Harum in porro molestiae sed in voluptates nihil ut. Nam at eum non.\n \rFugiat rem rerum culpa beatae. Voluptatem quia at dolor eum aspernatur. Reprehenderit in et corporis distinctio. Accusantium omnis quos distinctio debitis et.\n \rRepellat consectetur ab aperiam et similique dicta. Tempora dolorum facere voluptates aut. Quis exercitationem molestias eius et ad et eaque. Voluptas quas occaecati et. Aut et aspernatur. Qui dolore rerum ut reiciendis eius pariatur harum in sit.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 118,
          UserId: 6,
          TweetId: 40,
          comment: "Corrupti deserunt debitis eum.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 119,
          UserId: 5,
          TweetId: 40,
          comment:
            "Amet et officia similique est debitis. Facilis dignissimos et itaque voluptatem ipsa ullam laboriosam. Culpa nam corrupti ad. Et numquam suscipit ratione fuga suscipit eos.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 120,
          UserId: 2,
          TweetId: 40,
          comment:
            "Ut dignissimos omnis. Vitae iste et non illum culpa sit. Quasi deserunt corrupti et est velit debitis quasi a fugiat. Inventore doloribus iusto. Sed voluptatem magni deserunt. Esse impedit iure quidem nulla magnam quidem non adipisci.\n \rEt ullam consectetur modi eos rerum qui qui doloremque quia. Quia facere esse totam repellat quae alias. Consequatur soluta omnis distinctio rerum repellendus qui.\n \rQuo earum explicabo dolorem sit. Architecto perspiciatis maiores ea molestiae quia voluptates. Beatae aut est. Id enim culpa maiores voluptas incidunt architecto.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 5,
        email: "user4@example.com",
        password:
          "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
        name: "user4",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/noufalibrahim/128.jpg",
        introduction: "I am user4",
        role: "user",
        account: "@user4",
        cover: "http://lorempixel.com/640/480/food",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 121,
    UserId: 2,
    TweetId: 41,
    comment: "fuga",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 41,
      UserId: 6,
      description:
        "Voluptas odio vero omnis a enim voluptas alias. Quis earum maiores quia qui neque reprehenderit vero atque nisi. Pariatur non excepturi. Autem fugit quis eaque modi quam ex. Est quia vel perspiciatis et aut totam natus. Repudiandae illo veniam.\n \rQui natus saepe itaque et. Optio dolorem non id ad laudantium eos culpa. Blanditiis dolorem magnam et delectus est. Dolor non vel recusandae non nihil soluta voluptas. Earum nihil aut tenetur consequatur maiores voluptatem tenetur. Quod autem hic tenetur expedita.\n \rQuaerat rem totam aliquid odio asperiores rem dolores. Tenetur repellendus ut possimus. Perspiciatis quasi maxime illo ratione quia dolores enim architecto molestiae. Et cupiditate natus facilis.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 121,
          UserId: 2,
          TweetId: 41,
          comment: "fuga",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 122,
          UserId: 5,
          TweetId: 41,
          comment:
            "Quas nesciunt commodi aperiam numquam.\nArchitecto ducimus assumenda.\nLabore laboriosam autem voluptates ratione.\nRepudiandae neque eius saepe.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 123,
          UserId: 4,
          TweetId: 41,
          comment: "nam non sit",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 6,
        email: "user5@example.com",
        password:
          "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
        name: "user5",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
        introduction: "I am user5",
        role: "user",
        account: "@user5",
        cover: "http://lorempixel.com/640/480/fashion",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 124,
    UserId: 2,
    TweetId: 42,
    comment:
      "Voluptatibus quod magnam laborum sint veniam repellat. Aliquam velit sunt nemo. Praesentium fugiat est voluptatem asperiores labore nihil laudantium et.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 42,
      UserId: 6,
      description:
        "Velit voluptatibus id est doloremque. Blanditiis est qui enim nesciunt sit. Iusto corporis nemo et.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 124,
          UserId: 2,
          TweetId: 42,
          comment:
            "Voluptatibus quod magnam laborum sint veniam repellat. Aliquam velit sunt nemo. Praesentium fugiat est voluptatem asperiores labore nihil laudantium et.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 125,
          UserId: 4,
          TweetId: 42,
          comment: "rerum",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 126,
          UserId: 3,
          TweetId: 42,
          comment: "reiciendis accusamus ut",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 6,
        email: "user5@example.com",
        password:
          "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
        name: "user5",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
        introduction: "I am user5",
        role: "user",
        account: "@user5",
        cover: "http://lorempixel.com/640/480/fashion",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 136,
    UserId: 2,
    TweetId: 46,
    comment: "sint",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 46,
      UserId: 6,
      description:
        "Repellat dolorem voluptates deserunt. Explicabo repudiandae error facilis cumque voluptatem impedit et modi. Sed minima qui voluptate quae esse adipisci animi rerum. Velit est omnis.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 136,
          UserId: 2,
          TweetId: 46,
          comment: "sint",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 137,
          UserId: 5,
          TweetId: 46,
          comment:
            "Omnis voluptatem est repellat pariatur. Quibusdam consequatur repudiandae vel vitae voluptatem vero. Tempore id ad nulla error nemo facilis laudantium.\n \rFuga blanditiis optio sit. Et voluptatem rem. Molestiae et dolore molestiae dolores aut porro. Ab magnam pariatur. Culpa laborum placeat ratione omnis voluptatem aut qui laborum.\n \rQui et explicabo et. Accusantium quos dignissimos amet rem. Molestiae sequi recusandae nostrum. Dolores quis omnis nemo. Aliquid fugiat temporibus laboriosam excepturi placeat velit ipsum eos corporis. Facilis dolor et odio distinctio.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 138,
          UserId: 6,
          TweetId: 46,
          comment: "Neque expedita sint odio dolorem.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 6,
        email: "user5@example.com",
        password:
          "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
        name: "user5",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
        introduction: "I am user5",
        role: "user",
        account: "@user5",
        cover: "http://lorempixel.com/640/480/fashion",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 139,
    UserId: 2,
    TweetId: 47,
    comment: "Impedit repudiandae quos reiciendis soluta deleniti magnam modi.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 47,
      UserId: 6,
      description: "laborum",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 139,
          UserId: 2,
          TweetId: 47,
          comment:
            "Impedit repudiandae quos reiciendis soluta deleniti magnam modi.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 140,
          UserId: 4,
          TweetId: 47,
          comment:
            "Doloremque maxime adipisci eos porro omnis tempore. Assumenda culpa qui est quas quae est soluta neque. Molestiae magni dolore ea quam consequatur. Et quod voluptatum ratione autem rerum numquam reiciendis cumque. Neque veritatis qui.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 141,
          UserId: 6,
          TweetId: 47,
          comment:
            "Vero facilis id a dignissimos qui doloribus iusto. Velit laboriosam corporis distinctio consectetur reiciendis quia doloremque. Iure voluptatem ea voluptatibus consequatur harum.\n \rLabore et qui. In et corporis dolorum commodi praesentium dolorum. Eos deserunt dolor aut. Iure voluptatem dolore ullam ut. Nesciunt ratione omnis quaerat in enim occaecati doloremque voluptatem incidunt. Modi at dolores animi sed minima sequi id exercitationem.\n \rHic maiores est optio quibusdam. Aut architecto quos qui nostrum itaque porro sit adipisci. Laborum excepturi sed.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 6,
        email: "user5@example.com",
        password:
          "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
        name: "user5",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
        introduction: "I am user5",
        role: "user",
        account: "@user5",
        cover: "http://lorempixel.com/640/480/fashion",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
  {
    id: 145,
    UserId: 2,
    TweetId: 49,
    comment: "Laborum amet eos rem eaque praesentium non magni.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Tweet: {
      id: 49,
      UserId: 6,
      description:
        "Cumque iure qui. Placeat ex voluptatum. A aut dicta cum velit placeat vel. Magni consequatur rerum saepe dolorem inventore praesentium. Aut explicabo enim quasi quidem est qui.",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 145,
          UserId: 2,
          TweetId: 49,
          comment: "Laborum amet eos rem eaque praesentium non magni.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 146,
          UserId: 6,
          TweetId: 49,
          comment: "quo",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 147,
          UserId: 3,
          TweetId: 49,
          comment: "sit numquam praesentium",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 6,
        email: "user5@example.com",
        password:
          "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
        name: "user5",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
        introduction: "I am user5",
        role: "user",
        account: "@user5",
        cover: "http://lorempixel.com/640/480/fashion",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      Likes: [],
    },
    isLiked: false,
  },
];

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

import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
import UserProfileEditModal from "./../components/UserProfileEditModal";
import UserProfileCard from "./../components/UserProfileCard";
import { v4 as uuidv4 } from "uuid";

export default {
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
      likePage: true,
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
    fetchUserTweets() {
      this.tweets = dummyTweetsReply.map((tweet) => {
        return {
          ...tweet,
          tweet: {
            ...tweet.Tweet,
            isLiked: tweet.isLiked,
          },
        };
      });
      this.tweets = this.tweets.map((tweet) => {
        return tweet.tweet;
      });
      console.log(this.tweets);
    },
    fetchUser() {
      console.log("3333");
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