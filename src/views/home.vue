<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" />
    <div class="main-tweets">
      <div class="tweet-create">
        <div class="tweet-title">
          <p>首頁</p>
        </div>
        <div class="tweet-create-container">
          <div class="profile-image">
            <router-link to="/users/:id">
              <img :src="currentUser.avatar" class="user-img" alt="" />
            </router-link>
          </div>
          <form class="tweet-input">
            <textarea
              name="tweet-input-area"
              class="tweet-input-content"
              id=""
              cols="30"
              rows="10"
              placeholder="有什麼新鮮事？"
              v-model="description"
            ></textarea>
            <button
              type="submit"
              class="tweet-create-btn"
              @click.stop.prevent="createTweet"
            >
              推文
            </button>
          </form>
        </div>
      </div>
      <UserTweetsList
        @showReplyModal="showReplyModal"
        :pageMode="pageMode"
        :initialTweets="tweets"
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
      @after-create-reply="createReply"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
import { v4 as uuidv4 } from "uuid";

const dummyUser = {
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

const dummyTweets = [
  {
    id: 1,
    UserId: 2,
    description: "architecto",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 1,
        UserId: 4,
        TweetId: 1,
        comment: "dolores quia iusto",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 2,
        UserId: 6,
        TweetId: 1,
        comment:
          "Quos numquam incidunt dolor vitae. Et aperiam provident maxime eum alias. Ipsam possimus eveniet numquam possimus eveniet. Et sequi quo eveniet odio totam excepturi et eius tempora. Quos ea reprehenderit eum aut.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 3,
        UserId: 3,
        TweetId: 1,
        comment: "sit",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [
      {
        id: 1,
        UserId: 2,
        TweetId: 1,
        createdAt: "2020-10-03T08:06:00.000Z",
        updatedAt: "2020-10-03T08:06:00.000Z",
      },
    ],
    isLiked: true,
  },
  {
    id: 2,
    UserId: 2,
    description: "Est nesciunt porro aperiam dolor saepe.\nTotam quia",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 4,
        UserId: 5,
        TweetId: 2,
        comment: "Adipisci quos numquam.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 5,
        UserId: 2,
        TweetId: 2,
        comment: "quod",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 6,
        UserId: 4,
        TweetId: 2,
        comment: "delectus",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [
      {
        id: 2,
        UserId: 2,
        TweetId: 2,
        createdAt: "2020-10-03T08:06:00.000Z",
        updatedAt: "2020-10-03T08:06:00.000Z",
      },
    ],
    isLiked: true,
  },
  {
    id: 3,
    UserId: 2,
    description: "Eos placeat dolorem consequatur. Sequi et eos quam",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 7,
        UserId: 5,
        TweetId: 3,
        comment:
          "Doloremque perferendis libero ut similique sit est blanditiis alias.\nQuis tempore possimus a ab libero labore.\nEt nihil laboriosam nemo placeat et.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 8,
        UserId: 6,
        TweetId: 3,
        comment:
          "Enim fuga ut et. Hic quibusdam molestiae. Qui quo dolores a quos. Sapiente error nisi laboriosam maiores. Qui aliquam accusantium unde provident tenetur et accusamus magni.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 9,
        UserId: 4,
        TweetId: 3,
        comment: "distinctio dolor aut",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 4,
    UserId: 2,
    description: "Doloremque in et delectus quibusdam consequatur. Q",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 10,
        UserId: 6,
        TweetId: 4,
        comment:
          "Eum voluptas aspernatur odit modi necessitatibus enim et quia. Nobis et odit voluptates. Voluptatem autem et repudiandae ducimus beatae. Velit illum iusto omnis ut. Aliquid aspernatur explicabo et incidunt laborum nisi facere doloribus. Consequuntur et ipsa libero cupiditate velit voluptates.\n \rAut modi voluptates quaerat soluta ea placeat doloremque quasi. In in quia laudantium consequatur. Minima explicabo ut quasi et ipsa rerum. Alias sed omnis at error ducimus et et et. Non hic eum maiores dolores aut delectus distinctio. Accusantium eligendi voluptatem aut commodi facere et et ut.\n \rDolore mollitia omnis distinctio enim ut fugit. Necessitatibus sunt eveniet eos dolor sunt vel omnis. Et praesentium voluptas illo doloribus ipsum qui. Consequatur explicabo aperiam facilis iure ratione soluta repudiandae possimus eum.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 11,
        UserId: 5,
        TweetId: 4,
        comment: "Pariatur sed est doloremque nesciunt.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 12,
        UserId: 3,
        TweetId: 4,
        comment:
          "Et est perspiciatis minima et quasi possimus. Alias vel voluptas debitis id possimus. Voluptatem labore dolor similique voluptatem repellat unde enim. Quibusdam quam libero quis nam sequi iusto corporis quo. Nihil autem eveniet voluptatem qui sint at.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 5,
    UserId: 2,
    description: "Inventore laboriosam doloremque deleniti iste dolo",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 13,
        UserId: 4,
        TweetId: 5,
        comment: "et natus fugit",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 14,
        UserId: 2,
        TweetId: 5,
        comment:
          "Magnam quos est velit aliquam qui suscipit sequi in.\nExpedita consequatur incidunt rerum asperiores animi sit.\nAut voluptatibus voluptate ipsa.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 15,
        UserId: 6,
        TweetId: 5,
        comment:
          "Et culpa non autem aut qui voluptas nihil et. Praesentium voluptatem voluptatem voluptatem omnis quod sint ut. Ut error ab voluptatum sint beatae totam esse praesentium. Quibusdam odio id illum.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 6,
    UserId: 2,
    description: "Ut quas molestiae commodi error velit consequatur ",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 16,
        UserId: 4,
        TweetId: 6,
        comment:
          "Quia est minima. Rerum fuga consequatur molestiae animi iste nulla provident. Pariatur ipsa nihil sapiente aut. Aut veritatis et est inventore. Porro illo consequatur qui in placeat qui quo maxime. Dolorem nihil at maxime cumque aut qui labore nam error.\n \rIn voluptatibus molestiae. Repellat et velit deserunt sit fugit aut. Velit et veritatis rem expedita ipsum eum consequatur illo. Qui repudiandae laborum vitae ipsam voluptate doloremque quos.\n \rProvident vel atque officia debitis eveniet repellat odio omnis placeat. Ea sed enim nihil. Qui nulla quia suscipit omnis quas soluta omnis ex quos. Natus et dolor dolore qui odit fugiat. Quidem veritatis iure sunt sed.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 17,
        UserId: 3,
        TweetId: 6,
        comment:
          "Vel nostrum vero cupiditate rerum id. Quidem voluptatem possimus illum quam non. Id soluta deleniti omnis ad. Aliquam architecto excepturi.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 18,
        UserId: 6,
        TweetId: 6,
        comment: "Rem quaerat quia ex enim distinctio non cumque quidem.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 7,
    UserId: 2,
    description: "ex velit sed",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 19,
        UserId: 3,
        TweetId: 7,
        comment: "sequi",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 20,
        UserId: 6,
        TweetId: 7,
        comment: "in",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 21,
        UserId: 5,
        TweetId: 7,
        comment:
          "Laborum occaecati totam tempora laboriosam dolorem qui neque aperiam illum. Illo deleniti commodi nobis. Ut recusandae et et. Sit aut aliquid neque natus est.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 8,
    UserId: 2,
    description: "Mollitia cupiditate error. Eum adipisci quisquam m",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 22,
        UserId: 2,
        TweetId: 8,
        comment: "sed autem est",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 23,
        UserId: 6,
        TweetId: 8,
        comment: "reprehenderit",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 24,
        UserId: 3,
        TweetId: 8,
        comment: "Aut harum itaque quos voluptas velit.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 9,
    UserId: 2,
    description: "Repellendus dignissimos explicabo iste nisi non do",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 25,
        UserId: 3,
        TweetId: 9,
        comment:
          "Voluptatem et voluptates modi mollitia veritatis perspiciatis. Voluptatem at placeat quam. Ea suscipit ipsa.\n \rEt asperiores quae assumenda sit velit. Eos nulla quis officiis. Neque cumque temporibus non autem dolor quis et incidunt.\n \rMagnam fugiat porro dolores velit rerum quaerat. Odio qui voluptates totam beatae voluptatem blanditiis corporis libero assumenda. Ipsa ut sed. Ipsa numquam velit ut minima in ullam.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 26,
        UserId: 2,
        TweetId: 9,
        comment: "sint",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 27,
        UserId: 4,
        TweetId: 9,
        comment:
          "Nulla repellat non enim inventore sapiente nihil dolore qui dolor. Rerum voluptate qui iste soluta eos veniam temporibus voluptas. Velit deserunt et dolores quae veniam dolorem corporis. Enim sit rerum.\n \rCumque est tempore corporis amet. Ex placeat quo maxime molestias exercitationem ex. Et enim eos. Ut nobis dicta.\n \rQui quis et. Nemo quisquam sit ipsum vitae iste. Esse vitae fuga ut voluptatem fugiat. Velit et aliquam. Nulla rerum officia at. Assumenda quaerat et laboriosam facilis quia.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 10,
    UserId: 2,
    description: "Molestias nisi ut sit nulla dolor facilis et dolor",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$quUiAw8V2XYIQYePITN0B.TV32fykUuHkdD1ubUERoIBc25F6luF2",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/nightlife",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 28,
        UserId: 6,
        TweetId: 10,
        comment:
          "Ipsum temporibus quis eligendi dicta quo. Porro molestiae id eum et ab nobis et fuga. Sapiente delectus sed qui. Qui officia incidunt placeat.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 29,
        UserId: 3,
        TweetId: 10,
        comment: "Perspiciatis inventore laboriosam error perferendis odit.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 30,
        UserId: 5,
        TweetId: 10,
        comment: "omnis",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 11,
    UserId: 3,
    description: "quidem",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 31,
        UserId: 2,
        TweetId: 11,
        comment: "voluptates",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 32,
        UserId: 4,
        TweetId: 11,
        comment:
          "Eum nam vitae blanditiis. Nihil rem et. Eos autem cumque totam ad et rerum molestiae distinctio accusamus. Quidem et sit ea nisi ut incidunt et placeat sed. Officia commodi corporis. Voluptas vero vel.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 33,
        UserId: 5,
        TweetId: 11,
        comment:
          "Maxime et consectetur quaerat atque ullam. Ipsa sed dolorem itaque error facere dolores. Debitis possimus commodi excepturi. Ut eius voluptas necessitatibus maiores in cumque soluta similique illum. Sint quae voluptatem harum.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 12,
    UserId: 3,
    description: "Eius consequatur et.",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 34,
        UserId: 4,
        TweetId: 12,
        comment:
          "Consequatur ab earum et. Excepturi delectus dicta et. Rem illo molestias. Quis corporis rem et iure eveniet omnis vitae. Quasi quis qui vero eos quasi ipsa sunt. Illum inventore eveniet dolores distinctio aut atque quas voluptatibus.\n \rNecessitatibus aliquam est. Qui veritatis corrupti consequuntur unde et unde. Est nemo in neque doloremque reiciendis sapiente. Labore autem aliquid non illo et sed nihil. Possimus ducimus voluptatem sit atque placeat. Deserunt veniam nostrum.\n \rVel ratione temporibus est itaque quisquam repellat cupiditate voluptas. Incidunt quasi culpa est aperiam eum eligendi veniam. Tempora aut praesentium. Ea animi ut dolorem accusantium.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 35,
        UserId: 6,
        TweetId: 12,
        comment: "molestiae est ipsa",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 36,
        UserId: 2,
        TweetId: 12,
        comment:
          "Voluptatem quibusdam cupiditate tenetur.\nFuga repellendus nihil et quam.\nDolor voluptatum aliquam.\nDolores facilis quam quo velit iure blanditiis blanditiis.\nEt quo quibusdam.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 13,
    UserId: 3,
    description: "est pariatur cupiditate",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 37,
        UserId: 5,
        TweetId: 13,
        comment:
          "Quo et quidem voluptas alias. Voluptatem velit dignissimos quo vel iste rem rerum aut sunt. Ipsa itaque nulla minima ducimus. Voluptatem veniam accusamus qui delectus rerum possimus neque recusandae.\n \rError aliquid facere. Sit temporibus nostrum minima non recusandae velit cupiditate. Ad officiis maiores nihil veritatis alias ex autem ex. Vitae sit repellat et molestiae sit. Quod odio ipsa dolorem minima. Molestiae est voluptate est recusandae deleniti deleniti in sint ex.\n \rError eligendi similique ad iusto quidem. Saepe hic vitae temporibus magni ipsam commodi aspernatur voluptatem doloremque. Fuga voluptatem repellat hic qui ea ut. Nisi eaque doloribus rem sit sint. Pariatur consequuntur quia aut suscipit ipsa quis harum porro.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 38,
        UserId: 6,
        TweetId: 13,
        comment:
          "Ex quis minus ab. Omnis quia laudantium magni et ullam. Explicabo ab aut eveniet aspernatur doloribus ut eveniet cumque cum. Earum nemo at delectus.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 39,
        UserId: 2,
        TweetId: 13,
        comment:
          "Velit cumque vel. Totam similique laborum pariatur ut quod maiores ut vel. Et eum totam magnam nisi et voluptatem molestiae. Quibusdam est quos porro velit. Quo quas impedit repellendus porro consectetur qui.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 14,
    UserId: 3,
    description: "Tempora ipsum et voluptatem odit.\nEnim veritatis i",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 40,
        UserId: 6,
        TweetId: 14,
        comment: "accusamus voluptatem et",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 41,
        UserId: 3,
        TweetId: 14,
        comment: "Sapiente nisi omnis.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 42,
        UserId: 2,
        TweetId: 14,
        comment:
          "A tenetur animi earum iure eaque quae est nihil suscipit. Accusamus officia inventore perspiciatis quod ad qui. Hic sapiente suscipit omnis deleniti tenetur.\n \rNon dicta iste consequatur. Optio dignissimos quas omnis laudantium qui nobis quasi laboriosam. Expedita rem voluptatem est aut nostrum non. Omnis reprehenderit nulla voluptas consequatur. Exercitationem molestiae ut numquam.\n \rQuis voluptates nihil provident ex dolorem et. Inventore consequatur quia autem quia dignissimos fugit et consectetur porro. Ut ut autem aut dicta placeat accusamus provident est assumenda. Ducimus sed iusto et harum aut ut. Quia vitae tempore doloribus omnis. Est velit rerum sint deleniti esse.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 15,
    UserId: 3,
    description: "Odio repudiandae eius quasi magni est optio. Neque",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 43,
        UserId: 5,
        TweetId: 15,
        comment:
          "Unde quasi debitis pariatur aut. Magnam enim consectetur sequi est. Illum quas quisquam officia pariatur aspernatur commodi ipsa aut. Quia assumenda et dolor eaque similique et voluptatem sed. Delectus ducimus sint quia enim eos autem eaque corporis praesentium.\n \rDolorem perferendis voluptas ut. Cupiditate est sapiente repellat odit delectus enim mollitia nam. Quisquam aut iure facere repudiandae provident architecto voluptas. Pariatur ex qui ut voluptates optio consequatur non corporis.\n \rSed velit officia vero itaque quasi. Quae excepturi earum similique qui in deleniti suscipit. Ut iusto commodi sed sit minima sed fugit.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 44,
        UserId: 4,
        TweetId: 15,
        comment: "et dignissimos asperiores",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 45,
        UserId: 6,
        TweetId: 15,
        comment: "Quis quia aut fuga minima qui quod iure quaerat.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 16,
    UserId: 3,
    description: "quia architecto et",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 46,
        UserId: 6,
        TweetId: 16,
        comment:
          "Et quam sit. Officiis quod eius quos ut quasi corrupti sed consequatur.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 47,
        UserId: 4,
        TweetId: 16,
        comment:
          "Provident ducimus nihil et et nesciunt molestias. Praesentium maiores illum similique. Labore aut voluptas qui error.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 48,
        UserId: 2,
        TweetId: 16,
        comment: "ut",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 17,
    UserId: 3,
    description: "excepturi",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 49,
        UserId: 2,
        TweetId: 17,
        comment: "Modi autem repellendus saepe sint nobis sapiente.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 50,
        UserId: 5,
        TweetId: 17,
        comment:
          "Est assumenda saepe eligendi omnis quaerat aliquam eum voluptate temporibus.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 51,
        UserId: 3,
        TweetId: 17,
        comment:
          "Ut odio laudantium dolorum atque. Omnis consequatur natus sint vero. Tenetur molestiae illum fugiat aliquam et voluptatem quidem iure.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 18,
    UserId: 3,
    description: "accusamus",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 52,
        UserId: 5,
        TweetId: 18,
        comment:
          "Neque beatae cupiditate recusandae autem repellat qui tenetur optio rem. Nam cupiditate sit delectus aliquid dolor.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 53,
        UserId: 3,
        TweetId: 18,
        comment:
          "Quod modi non molestiae a non sunt porro asperiores incidunt. Aut amet maxime enim exercitationem vitae facilis excepturi aut explicabo. Voluptas eum minus sint sint ab est at ipsam. Pariatur repellat eos sapiente mollitia perferendis quia officiis rerum.\n \rAut itaque distinctio excepturi illo ducimus facere consequatur omnis. Iusto natus impedit illum a. Atque alias et minima animi tempora in quo vitae deleniti.\n \rOmnis illo mollitia quos esse laborum dolorem et non. Unde sit harum vitae. Qui magni ut asperiores ut ut officiis exercitationem. Aut nam quia sed nulla autem molestias voluptatum excepturi. Qui sit quo.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 54,
        UserId: 4,
        TweetId: 18,
        comment: "nesciunt",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 19,
    UserId: 3,
    description: "fugiat",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 55,
        UserId: 3,
        TweetId: 19,
        comment: "Suscipit consequatur eos dolorum ducimus.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 56,
        UserId: 5,
        TweetId: 19,
        comment:
          "Minus cumque aut nihil nemo earum consectetur magni voluptatem facilis.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 57,
        UserId: 6,
        TweetId: 19,
        comment:
          "Fuga eum dolores dignissimos aut ut quis nemo.\nNecessitatibus similique accusamus molestias adipisci eos quia.\nDucimus quibusdam perspiciatis corrupti architecto ullam facere.\nQuia nemo ipsa consectetur ea voluptate debitis cumque aliquam.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 20,
    UserId: 3,
    description: "Praesentium facere eveniet veniam debitis accusamu",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$2UWS6uWnsAEhPBkwFnRjZ.5tCDuLeiSZVw48qzFWW1QhVPi0eOUMa",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/deeenright/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/cats",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 58,
        UserId: 5,
        TweetId: 20,
        comment: "Consectetur qui possimus. Qui neque consequatur nemo.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 59,
        UserId: 4,
        TweetId: 20,
        comment: "itaque asperiores velit",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 60,
        UserId: 2,
        TweetId: 20,
        comment:
          "Nihil consectetur amet sit. Officiis nulla ad rem sequi explicabo ut error quidem. Voluptatem consequatur et tempore placeat vero autem et dolores.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 21,
    UserId: 4,
    description: "nostrum quasi vel",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 61,
        UserId: 2,
        TweetId: 21,
        comment: "Quam consequatur vero.\nRatione qui id at.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 62,
        UserId: 3,
        TweetId: 21,
        comment: "maiores id harum",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 63,
        UserId: 6,
        TweetId: 21,
        comment: "Itaque accusantium qui unde repudiandae corporis ut saepe.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 22,
    UserId: 4,
    description: "Sunt in dolore nihil cupiditate qui corrupti et om",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 64,
        UserId: 5,
        TweetId: 22,
        comment:
          "Tempora aperiam assumenda illum nihil et inventore nam sit numquam. Consequuntur labore perferendis voluptatem nihil molestiae adipisci quae dignissimos perspiciatis. Ipsum deleniti ut saepe nesciunt est quo et voluptatem. Dolor blanditiis placeat autem culpa et qui.\n \rReprehenderit voluptates esse eos repudiandae maxime ratione quidem ad. Explicabo dolor necessitatibus veniam corrupti. Quod explicabo placeat magnam incidunt quae labore eveniet.\n \rLaborum dicta et cum sapiente. Ab id a inventore est. Esse facere perspiciatis a repellat sapiente. Numquam mollitia ut vel nam voluptatem debitis. Quidem deserunt cupiditate facilis eum qui neque minima inventore nihil. Sit aut quia voluptate.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 65,
        UserId: 6,
        TweetId: 22,
        comment: "Optio et et autem omnis tempora quia cum perspiciatis quas.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 66,
        UserId: 3,
        TweetId: 22,
        comment: "consequatur omnis et",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 23,
    UserId: 4,
    description: "pariatur quaerat rerum",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 67,
        UserId: 5,
        TweetId: 23,
        comment:
          "Beatae dicta rerum eveniet quas. Delectus eligendi incidunt. Aliquid ad incidunt aut alias ullam magnam. Nobis iure adipisci reiciendis omnis repellendus voluptas. Repudiandae aliquid tenetur dolores temporibus enim ut et.\n \rOdit commodi praesentium voluptatum quia numquam odit. Doloremque nesciunt sunt perspiciatis et. Debitis nulla repellendus consequatur. Qui labore aut dolor quo. Provident asperiores quo quia aperiam voluptatem voluptatem. Ab non temporibus dolore placeat expedita sed.\n \rPerspiciatis quasi vel. Aut tempore explicabo architecto quia et ut tenetur dolores. Ea sequi omnis officia quas voluptatum repellat.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 68,
        UserId: 4,
        TweetId: 23,
        comment: "cupiditate odit ipsum",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 69,
        UserId: 6,
        TweetId: 23,
        comment:
          "Assumenda sint veritatis aperiam ipsa asperiores nihil vero voluptates cum. Officia iusto aut ut corporis quis autem aut. Fugiat commodi voluptatum expedita vero ullam repellat possimus.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 24,
    UserId: 4,
    description: "Mollitia voluptates ut excepturi voluptatibus qui.",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 70,
        UserId: 2,
        TweetId: 24,
        comment:
          "Sit non soluta. Tempore ut vel nobis esse. Harum qui nostrum qui.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 71,
        UserId: 5,
        TweetId: 24,
        comment:
          "Doloremque sunt et corrupti expedita et recusandae unde consequuntur.\nEt nostrum natus.\nVoluptatem cumque maiores ipsum asperiores dolorem qui.\nQuia occaecati tenetur aliquid iste dolor dolores.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 72,
        UserId: 4,
        TweetId: 24,
        comment:
          "Reiciendis iste culpa omnis reiciendis quae doloribus minima. Recusandae quibusdam repudiandae ratione amet accusantium harum quae quasi dolorem. Qui ut placeat. Architecto fugiat voluptates dolores aut voluptas quaerat.\n \rEt perferendis pariatur totam voluptate. Voluptatum accusamus qui sequi in quam enim praesentium labore. Quisquam dolorem quia.\n \rImpedit aut illo optio. Dolor incidunt rem eos. Recusandae dolorem sunt tenetur ad non qui omnis veniam. Dolorum adipisci incidunt labore nam neque. Consectetur fugit aperiam molestiae et dolore aliquid sint.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 25,
    UserId: 4,
    description: "Consequatur cumque et molestias aut excepturi veni",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 73,
        UserId: 3,
        TweetId: 25,
        comment:
          "Tempora velit et sed consequatur consequatur optio. Quia consequatur impedit qui explicabo facilis deserunt quasi ut voluptatem. Autem dicta amet ducimus dignissimos distinctio in. Ut et est illum asperiores et possimus id. Neque blanditiis ipsa est soluta non eligendi consequatur. Quibusdam libero ut dolorum expedita impedit qui voluptatem ea cupiditate.\n \rDelectus neque aut accusantium ut sit ab porro. Porro dolor deleniti est sunt sit voluptatibus culpa. Molestiae omnis magnam quisquam modi.\n \rLaudantium sint voluptatibus. Pariatur nihil ab ratione dicta qui qui dignissimos ut. Quo quidem repellendus nemo a et. Unde nostrum asperiores tempore eveniet mollitia ut nesciunt. Et rerum quasi quia ullam laborum. Ex sit in numquam aut sit blanditiis sequi assumenda.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 74,
        UserId: 2,
        TweetId: 25,
        comment: "Molestias et architecto sint.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 75,
        UserId: 5,
        TweetId: 25,
        comment: "quas voluptatibus sunt",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 26,
    UserId: 4,
    description: "id ut sint",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 76,
        UserId: 5,
        TweetId: 26,
        comment:
          "Provident sit cum error est consequatur omnis sint. Tempore ea ex incidunt repellendus et. Libero voluptatem nesciunt quo et qui non alias autem.\n \rConsequuntur id est dolore ducimus. Earum rerum recusandae. Assumenda optio beatae doloribus dolorem et. Facere sint ea qui aut accusantium debitis non.\n \rVel hic dolores et numquam molestiae porro minima quia consequatur. Earum non ipsum sit eligendi magnam sit molestiae. Id praesentium eos exercitationem nemo sed molestiae nesciunt ad.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 77,
        UserId: 2,
        TweetId: 26,
        comment: "velit est vel",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 78,
        UserId: 6,
        TweetId: 26,
        comment:
          "Pariatur non est ex dignissimos totam sunt totam.\nSit numquam quo rerum quis earum aperiam.\nDolores ratione rerum ullam optio.\nVoluptatem unde optio architecto quidem.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 27,
    UserId: 4,
    description: "neque asperiores excepturi",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 79,
        UserId: 5,
        TweetId: 27,
        comment:
          "Voluptatem rerum exercitationem quo voluptatem aut cum.\nEt nesciunt et enim sed animi animi.\nMolestiae sint est ipsum.\nEnim omnis consectetur ipsa delectus nisi quibusdam iusto sed similique.\nPraesentium dolorem dicta.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 80,
        UserId: 2,
        TweetId: 27,
        comment:
          "Recusandae quisquam tempora doloremque voluptate. Praesentium dicta quas vel veritatis dicta sapiente doloremque est ut. Autem libero quo ab et qui iusto nemo inventore earum.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 81,
        UserId: 6,
        TweetId: 27,
        comment:
          "Magni quis architecto sunt saepe at in cum ut.\nEt autem iusto perferendis consequuntur adipisci similique fuga debitis.\nVoluptatem tenetur libero adipisci ratione.\nDolores reiciendis id voluptatem temporibus facilis.\nUt et molestiae odit reiciendis necessitatibus vero esse eligendi et.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 28,
    UserId: 4,
    description: "est animi et",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 82,
        UserId: 4,
        TweetId: 28,
        comment:
          "Pariatur enim odio aliquid atque nihil rerum vel. Consequatur quam alias et totam architecto aut recusandae animi vel. Natus placeat voluptas et sed est. Omnis dolorum possimus voluptatibus culpa quasi praesentium. Fugit expedita explicabo beatae quidem aut eos aliquid consequatur.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 83,
        UserId: 3,
        TweetId: 28,
        comment:
          "Reiciendis tenetur a sed voluptates laboriosam et at earum inventore.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 84,
        UserId: 6,
        TweetId: 28,
        comment: "labore sint quia",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 29,
    UserId: 4,
    description: "Vel itaque esse esse deleniti autem quam ut. Sit n",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 85,
        UserId: 5,
        TweetId: 29,
        comment:
          "Commodi officiis nobis suscipit sint in sit sapiente. Voluptatum est rem atque sint repudiandae. Nam fuga voluptatum iusto aspernatur id autem distinctio quibusdam at. Dignissimos laudantium officiis deleniti rerum. Ut sit eum est qui aut nisi perspiciatis. Dolores rerum reprehenderit eum magni quo ullam.\n \rAut sint vel veniam. Aut rem voluptatem ut impedit qui officia autem impedit. Sed nulla qui earum repellendus.\n \rRepellendus reiciendis aut. Quo adipisci consectetur illo excepturi ullam officia id ut. Facilis velit nihil vero reiciendis autem odio.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 86,
        UserId: 3,
        TweetId: 29,
        comment:
          "Qui vitae unde. Tenetur odit unde omnis excepturi voluptatem maiores est explicabo et. Maxime et amet perferendis voluptatibus laboriosam illo nam dolor excepturi. Porro quasi aperiam provident sit minus consequatur laborum unde iure.\n \rCum ut minima vero velit ut fuga. Exercitationem est quos debitis facere. Temporibus voluptas doloremque cumque in omnis vel placeat libero.\n \rRatione ut neque molestiae accusamus voluptas quaerat. Itaque praesentium provident. Corporis beatae et et necessitatibus nihil est. Et excepturi repellendus dolorum sapiente et.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 87,
        UserId: 2,
        TweetId: 29,
        comment:
          "Porro est distinctio molestiae rerum. Amet voluptate est ut occaecati qui quisquam saepe. Et rerum omnis dolorum est consequatur aut enim. Eveniet omnis nihil iste deleniti vel ullam adipisci. Illo quia alias similique. Aperiam aperiam doloribus sit et aut id inventore.\n \rNon recusandae ut consequatur necessitatibus. Eos praesentium ducimus saepe suscipit culpa. Modi laudantium tenetur similique. Vero porro delectus placeat vel.\n \rAliquid dolorum quisquam. Dolorem libero voluptas. Omnis et nam perferendis repudiandae ut repellat odit qui. Labore sunt tenetur architecto molestias quas esse praesentium quibusdam. Veritatis aspernatur minima qui ea mollitia quos enim.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 30,
    UserId: 4,
    description: "Dolorem numquam vel tempore corrupti esse ut. Aut ",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$B3gO9XjSYyUZQvRyYO79E.lJt3tsGqZNU5s6iYE0feqTIK7pKttAC",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ponchomendivil/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/abstract",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 88,
        UserId: 6,
        TweetId: 30,
        comment:
          "Nisi laudantium ab neque non voluptas sunt sapiente ipsa a. Dolorem quae deserunt non doloremque qui. Quis hic praesentium rerum sed doloribus et. Explicabo architecto quod. Explicabo eaque ducimus voluptatem delectus rerum ducimus nihil dignissimos adipisci. Sed voluptate cum eos natus ut incidunt quasi qui.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 89,
        UserId: 3,
        TweetId: 30,
        comment: "atque",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 90,
        UserId: 4,
        TweetId: 30,
        comment: "tempora quisquam iure",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 31,
    UserId: 5,
    description: "Est nesciunt debitis similique libero minima minim",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 91,
        UserId: 2,
        TweetId: 31,
        comment:
          "Non possimus facilis consequuntur numquam cum qui alias tempora accusamus. Hic cumque at quam dolores maxime. Dolores et inventore. Ut eaque et est velit doloremque sequi deleniti molestiae non. Placeat libero sed.\n \rVitae sed aut ipsam quasi veniam sint. Dolore modi voluptatem. Et facere nostrum molestiae. Adipisci possimus accusantium ex nobis natus fugiat. Et ducimus voluptatem enim exercitationem laudantium sit nemo aliquid eius.\n \rDolorem non voluptatem nihil quasi in magnam. Quia in enim quia dolor. Rerum harum distinctio eaque aut. Quas dolorem necessitatibus unde.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 92,
        UserId: 6,
        TweetId: 31,
        comment: "recusandae",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 93,
        UserId: 4,
        TweetId: 31,
        comment:
          "In corrupti blanditiis voluptatem sit est.\nTemporibus earum quis est ut.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 32,
    UserId: 5,
    description: "Placeat est neque et rem debitis. Numquam aut fugi",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 94,
        UserId: 6,
        TweetId: 32,
        comment:
          "Ut rerum sit assumenda culpa explicabo aut. Provident aut autem dolorem. Consequatur et modi et.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 95,
        UserId: 4,
        TweetId: 32,
        comment:
          "Omnis voluptas quia rem a occaecati iusto animi. In accusantium voluptas itaque quo vel autem. Explicabo doloribus minus a tempore. Libero inventore reprehenderit molestiae atque et corrupti nihil id sapiente. Non animi magni sint optio soluta dolores nisi nobis.\n \rId enim blanditiis et. Non eum in vel non quas. Optio praesentium fugiat. Optio quod explicabo dolorum dolore eligendi incidunt odit architecto. Eos voluptatem voluptate tempora nulla aspernatur accusantium. Nobis temporibus dolores tempore inventore qui repellendus nihil.\n \rVoluptatem sit distinctio. Illo totam alias doloribus maxime explicabo ut ut nulla. Adipisci consequuntur esse eos nisi mollitia accusamus. Praesentium aut fuga inventore odio minus quod dicta. Magni quos id quam aspernatur animi unde dolores sit eos. Praesentium rerum doloribus.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 96,
        UserId: 3,
        TweetId: 32,
        comment:
          "Quis id et quo sapiente sunt dolorem possimus tempore. Placeat exercitationem odit beatae tenetur dolorem ea unde accusamus. Aut nobis consectetur maxime quia dicta fugiat. Aliquid amet occaecati. Provident voluptas libero amet aperiam iste nisi enim.\n \rOptio fuga ea consequuntur autem. Excepturi corporis laboriosam. Reprehenderit magni at quisquam cum dolor veniam voluptas architecto. Animi nulla commodi eius id nemo et laboriosam perspiciatis. Voluptas minus dolor quo odit eius.\n \rNostrum non expedita consequuntur facere harum ut iste. Laboriosam neque est. Non quasi qui vel sunt. Ipsam a illo numquam esse iusto eius vel excepturi. Quisquam eum laboriosam et inventore nam.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 33,
    UserId: 5,
    description: "sunt",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 97,
        UserId: 2,
        TweetId: 33,
        comment:
          "Occaecati facilis a impedit non dolor et.\nPossimus aperiam inventore vel aperiam ipsum aut neque ea magnam.\nAut dolorem qui ipsa ut nihil consequuntur aut corporis perferendis.\nUnde eos est.\nEst numquam ipsa.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 98,
        UserId: 3,
        TweetId: 33,
        comment: "Itaque non ut voluptatem neque impedit alias ea.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 99,
        UserId: 5,
        TweetId: 33,
        comment:
          "Necessitatibus saepe animi inventore commodi perspiciatis facere.\nIllo et a non quo nihil consequatur exercitationem qui autem.\nCorporis totam delectus provident vitae eum eaque quos.\nNulla aut asperiores.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 34,
    UserId: 5,
    description: "Velit eveniet aut aperiam distinctio sunt. Incidun",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 100,
        UserId: 3,
        TweetId: 34,
        comment: "Amet et asperiores aliquam fugiat praesentium deserunt aut.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 101,
        UserId: 2,
        TweetId: 34,
        comment:
          "Doloremque eos quod. Id ea qui. Voluptas dolor veritatis sint aut reiciendis.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 102,
        UserId: 5,
        TweetId: 34,
        comment:
          "Hic in commodi dolorum. Quae voluptas error assumenda. Numquam esse dolorem voluptas hic laboriosam reprehenderit animi. Rerum facilis iure qui voluptatem qui error maxime.\n \rFugit aperiam eveniet fugiat molestiae sed. Incidunt eius earum. Non beatae cum. Qui praesentium cumque totam eius quis eius odio aut. Dolores sit esse.\n \rNemo at sunt incidunt dicta. Voluptatum earum soluta natus perferendis veniam doloribus iste perferendis sit. Facere numquam quia et. Asperiores voluptatum dolor qui perferendis dolore cumque sed. Ipsam consectetur sed inventore sit repudiandae et ad. Tempora qui id qui enim.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 35,
    UserId: 5,
    description: "Quia in dignissimos aut aspernatur et. Ut laborum ",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 103,
        UserId: 6,
        TweetId: 35,
        comment: "quae",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 104,
        UserId: 3,
        TweetId: 35,
        comment:
          "Delectus id reiciendis numquam. Soluta consectetur sunt. Qui alias quaerat maiores quos sunt velit necessitatibus veritatis. Rerum et facere. Veritatis autem quia asperiores nisi tenetur quia incidunt nihil incidunt. Voluptatem error et consequatur cupiditate consequatur ut neque cumque modi.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 105,
        UserId: 2,
        TweetId: 35,
        comment: "sed",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 36,
    UserId: 5,
    description: "sit recusandae cum",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 106,
        UserId: 2,
        TweetId: 36,
        comment: "Quo officiis ut itaque ea est.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 107,
        UserId: 5,
        TweetId: 36,
        comment: "libero enim provident",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 108,
        UserId: 3,
        TweetId: 36,
        comment: "Ducimus et enim laudantium alias qui id vitae.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 37,
    UserId: 5,
    description: "fugit",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 109,
        UserId: 5,
        TweetId: 37,
        comment:
          "Et aut rem corrupti. Adipisci quam minima magni error et. Molestiae est minus aspernatur quaerat non non velit. Ullam sed voluptate quod vero quod placeat fuga facilis. Possimus dolorem voluptates officia deleniti ut. Et fuga vero praesentium quia.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 110,
        UserId: 6,
        TweetId: 37,
        comment:
          "Voluptas et quibusdam ea sequi adipisci ipsum maxime. Cum et ut voluptates sint voluptatem exercitationem ab. Asperiores consequuntur quia.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 111,
        UserId: 3,
        TweetId: 37,
        comment: "expedita",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 38,
    UserId: 5,
    description: "Facilis quis aliquid amet nostrum.\nNemo quae quibu",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 112,
        UserId: 4,
        TweetId: 38,
        comment: "pariatur",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 113,
        UserId: 3,
        TweetId: 38,
        comment: "reiciendis sit aspernatur",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 114,
        UserId: 2,
        TweetId: 38,
        comment:
          "Quidem voluptatem officiis. Omnis dolores explicabo explicabo culpa rerum nemo cum non dolor. Porro voluptatem voluptate ducimus sed perferendis autem aliquid officia. Quibusdam qui voluptas aperiam sed autem in quaerat. Est est tempora. Provident ea in et qui ducimus sunt quibusdam sed.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 39,
    UserId: 5,
    description: "Repellat explicabo et eveniet est neque explicabo ",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 115,
        UserId: 3,
        TweetId: 39,
        comment: "Eaque vel delectus iusto necessitatibus iure earum.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 116,
        UserId: 5,
        TweetId: 39,
        comment: "quo",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 117,
        UserId: 4,
        TweetId: 39,
        comment: "rerum sed cum",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 40,
    UserId: 5,
    description: "optio",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 5,
      email: "user4@example.com",
      password: "$2a$10$Ix0yEEnOB1FETE6BhmNDSeGcz984MUgchLBuKeKwjp7i2AvnPN/d6",
      name: "user4",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg",
      introduction: "I am user4",
      role: "user",
      account: "@user4",
      cover: "http://lorempixel.com/640/480/fashion",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 118,
        UserId: 3,
        TweetId: 40,
        comment: "Necessitatibus neque libero aut reiciendis.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 119,
        UserId: 6,
        TweetId: 40,
        comment: "cum",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 120,
        UserId: 5,
        TweetId: 40,
        comment:
          "Commodi aspernatur ipsum. Ut neque autem porro numquam. Maxime dolorem possimus delectus ad.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 41,
    UserId: 6,
    description: "Molestias aut totam harum commodi fuga illum qui d",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 121,
        UserId: 6,
        TweetId: 41,
        comment: "rem",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 122,
        UserId: 4,
        TweetId: 41,
        comment:
          "Nemo corporis quis. Consequatur et rerum repudiandae laboriosam et. Veniam est quia. Quibusdam et deleniti. Velit quod atque consequatur aliquam. Vitae iusto ut ut.\n \rTempore nam perspiciatis quod rerum est omnis et possimus. Soluta doloribus et consequatur earum et. Laudantium dolores qui autem rem. Culpa consequatur praesentium voluptate qui fugiat qui. Animi consequatur eum dolorem nesciunt ut nemo magnam quo omnis. Voluptatum praesentium dolorum dolorum eos eos eligendi possimus vero.\n \rBlanditiis in nihil voluptas ut iste aspernatur. Sed omnis reprehenderit quo laudantium enim totam vitae. Aut esse totam itaque qui exercitationem. Tempore ipsum tenetur autem unde quos id nihil. Explicabo autem ut dicta. Qui et sit consequatur vero repellendus.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 123,
        UserId: 3,
        TweetId: 41,
        comment: "ut consequatur id",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 42,
    UserId: 6,
    description: "Recusandae in nisi. Quae fuga ut vel aut officia e",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 124,
        UserId: 3,
        TweetId: 42,
        comment: "quo",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 125,
        UserId: 6,
        TweetId: 42,
        comment:
          "Non error necessitatibus temporibus tempora reprehenderit nihil rerum maiores aut. Facilis nihil aut minima sit quia doloribus commodi. Voluptatum tempore et cupiditate asperiores rerum ea possimus. Corporis et dolor blanditiis consequatur numquam enim. Similique delectus illum dignissimos animi dignissimos ea veritatis.\n \rSimilique iste distinctio quisquam quo quisquam. Id assumenda non esse natus. Totam optio ea quos quia.\n \rCupiditate officia dolores ut. Libero consequatur totam molestias praesentium voluptatibus sit. Sed magni voluptatem nostrum harum rerum. Et consequatur consequatur doloremque.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 126,
        UserId: 4,
        TweetId: 42,
        comment: "Temporibus error autem.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 43,
    UserId: 6,
    description: "Laboriosam voluptatibus deserunt hic id pariatur q",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 127,
        UserId: 3,
        TweetId: 43,
        comment:
          "Autem assumenda et nam veniam fugit cupiditate maiores reprehenderit. Optio dolorem velit eum voluptate modi ut ad expedita ut. Totam cum optio fugit omnis cumque qui ducimus minus. Ex aut eos sint in provident minus corrupti voluptatem distinctio. Officiis officiis aut enim molestiae. At et corporis modi aliquid eos sint.\n \rSint et architecto ab et. Autem repellat quisquam. Laborum consequuntur delectus maxime aut. Praesentium in quia qui repellendus et dolorum repudiandae. Voluptatibus ad quasi doloribus voluptate iste totam et. Sed eligendi id suscipit similique earum dolorem sit commodi modi.\n \rArchitecto nesciunt est odit deserunt autem et deleniti. Praesentium iure optio. Quia officia illum perspiciatis ut sit tenetur odio. Nobis repellendus voluptate vel ipsam ullam. Doloribus tempore magnam provident impedit placeat accusamus debitis velit voluptas. Aut magni magni ut necessitatibus velit est.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 128,
        UserId: 2,
        TweetId: 43,
        comment:
          "Et provident aut quae rerum aut omnis aliquam molestiae. Dicta aut nam. Ipsum et et.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 129,
        UserId: 4,
        TweetId: 43,
        comment:
          "Tempora accusamus vitae ut vero saepe non veniam nam. Consectetur pariatur iste. Repellendus hic nostrum odit. Et sapiente aut ab asperiores necessitatibus illum laborum. Tenetur vitae voluptatem nesciunt et. Facere ratione eius.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 44,
    UserId: 6,
    description: "Vel assumenda est beatae ut est autem. Quasi debit",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 130,
        UserId: 3,
        TweetId: 44,
        comment:
          "Et sunt quia laboriosam ut sint quas est repellendus. Nostrum natus enim dolorem molestias.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 131,
        UserId: 4,
        TweetId: 44,
        comment:
          "Magni culpa magnam ratione autem ullam nulla sint aut sed. Ullam sed non sint modi molestiae.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 132,
        UserId: 2,
        TweetId: 44,
        comment:
          "Deserunt molestiae officiis nostrum pariatur et a reiciendis minima. Odit rerum et. Consectetur ad tempora ea suscipit harum porro non dolore. Et saepe eligendi.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 45,
    UserId: 6,
    description: "magni",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 133,
        UserId: 3,
        TweetId: 45,
        comment: "dicta ut ducimus",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 134,
        UserId: 5,
        TweetId: 45,
        comment: "quaerat",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 135,
        UserId: 2,
        TweetId: 45,
        comment: "delectus",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 46,
    UserId: 6,
    description: "Quia quidem illo consequatur amet deserunt reprehe",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 136,
        UserId: 2,
        TweetId: 46,
        comment: "Nam et rem quidem.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 137,
        UserId: 4,
        TweetId: 46,
        comment: "cupiditate",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 138,
        UserId: 3,
        TweetId: 46,
        comment: "Dolorem sed vel dolor autem nobis nesciunt rerum est aut.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 47,
    UserId: 6,
    description: "Minima consequatur beatae numquam ab.\nHic nisi eum",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 139,
        UserId: 3,
        TweetId: 47,
        comment: "architecto ut alias",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 140,
        UserId: 2,
        TweetId: 47,
        comment: "Harum eum alias ut ullam aliquid sunt beatae fugiat quod.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 141,
        UserId: 4,
        TweetId: 47,
        comment: "explicabo",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 48,
    UserId: 6,
    description: "voluptatibus dolores cumque",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 142,
        UserId: 6,
        TweetId: 48,
        comment: "alias",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 143,
        UserId: 3,
        TweetId: 48,
        comment: "Temporibus est modi et eius optio sequi optio.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 144,
        UserId: 4,
        TweetId: 48,
        comment:
          "Animi perferendis beatae. Quis iusto ab pariatur. Ut illo pariatur omnis porro aut et qui deleniti iste. Ullam magni temporibus error dolorum. Fugit occaecati ut expedita eius magni dicta sit.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 49,
    UserId: 6,
    description: "Facere praesentium fuga voluptate. Consectetur qui",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 145,
        UserId: 5,
        TweetId: 49,
        comment: "ex",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 146,
        UserId: 4,
        TweetId: 49,
        comment:
          "Nostrum maiores ea ex aliquid dolor necessitatibus quis neque sunt. Amet cum consequuntur nostrum illum. Quasi doloremque tempora reprehenderit sed et. Reprehenderit provident rerum quae sunt quaerat corporis exercitationem quibusdam nemo. Ut odio qui aliquam vitae non.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 147,
        UserId: 3,
        TweetId: 49,
        comment: "Autem temporibus sed aperiam voluptas voluptatem.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
  {
    id: 50,
    UserId: 6,
    description: "laudantium",
    createdAt: "2020-10-03T08:06:01.000Z",
    updatedAt: "2020-10-03T08:06:01.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$jFdHLPRBNX6y8QIu27KX0u8vV2HRefnmDFpyM4u7ngBz1o3L3qoeO",
      name: "user5",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/saschadroste/128.jpg",
      introduction: "I am user5",
      role: "user",
      account: "@user5",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T08:06:01.000Z",
      updatedAt: "2020-10-03T08:06:01.000Z",
    },
    Replies: [
      {
        id: 148,
        UserId: 6,
        TweetId: 50,
        comment:
          "Qui vel laborum tempore. Vero pariatur aliquam incidunt deserunt. Facere tempore rerum a. Dolor accusantium sit architecto. In atque repellendus quas unde qui dolorem fugiat minus modi.\n \rFacere placeat sed et sit dolorem vel unde doloribus. Nulla occaecati consequatur. Est sapiente sed accusamus est.\n \rHarum quisquam porro est aliquam. Magnam placeat expedita adipisci. Tenetur tenetur et accusantium adipisci. Fugit ut qui cupiditate est dolorem voluptatibus odit facilis iusto. Id labore debitis aut odit soluta ea voluptatum distinctio quam. Labore ducimus nihil illo aut et.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 149,
        UserId: 4,
        TweetId: 50,
        comment:
          "Qui omnis maiores. Tempora amet sed sint. Molestias et animi quaerat.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
      {
        id: 150,
        UserId: 5,
        TweetId: 50,
        comment:
          "Culpa illum dicta nam porro ad et.\nVoluptatem sit ad nihil inventore.",
        createdAt: "2020-10-03T08:06:01.000Z",
        updatedAt: "2020-10-03T08:06:01.000Z",
      },
    ],
    Likes: [],
    isLiked: false,
  },
];

export default {
  name: "home",
  components: {
    Sidebar,
    UserTweetsList,
    FollowTopList,
    TweetCreateModal,
    TweetReplyModal,
  },
  data() {
    return {
      currentUser: {},
      createModal: false,
      replyModal: false,
      pageMode: "main",
      tweets: [],
      description: "",
      tweet: {},
    };
  },
  created() {
    this.fetchCurrentUser();
    this.fetchUserTweets();
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    showReplyModal(replyTweet) {
      this.replyModal = true;
      this.tweet = replyTweet;
    },
    closeReplyModal() {
      this.replyModal = false;
    },
    fetchCurrentUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser,
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    },
    fetchUserTweets() {
      this.tweets = dummyTweets;
    },
    createTweet() {
      this.tweets.push({
        id: uuidv4(),
        userId: this.currentUser.id,
        createdAt: new Date(),
        description: this.description,
        User: {
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
        },
      });
      this.description = "";
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
      this.closeCreateModal();
    },
    createReply(payload) {
      const { id, TweetId, comment } = payload;
      this.tweet.Replies.push({
        id,
        TweetId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        comment,
        createdAt: new Date(),
      });
      this.closeReplyModal();
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

.main-tweets {
  width: 600px;
  height: 100%;
}
.tweet-title {
  font-size: 18px;
  font-weight: 700;
  width: 600px;
  height: 55px;
  border: 1px solid #e6ecf0;
}
.tweet-title p {
  line-height: 55px;
  margin-left: 15px;
}
.tweet-create-container {
  display: flex;
  width: 600px;
  height: 120px;
  padding-top: 10px;
  border: 1px solid #e6ecf0;
  border-bottom: 10px solid #e6ecf0;
}
.profile-image {
  width: 70px;
  height: 120px;
  display: flex;
  justify-content: center;
}
.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tweet-input {
  width: 510px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.tweet-input-content:focus {
  color: black;
}
.tweet-input-content {
  width: 510px;
  height: 26px;
  resize: none;
  border: none;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #9197a3;
}
.tweet-create-btn {
  width: 64px;
  height: 40px;
  background-color: #ff6000;
  border-radius: 50px;
  color: #f5f8fa;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  margin-top: 25px;
}
.tweet-create-btn:hover {
  background-color: #f75000;
}
</style>