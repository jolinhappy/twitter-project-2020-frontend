<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar :isAdmin="isAdmin" />
    <div class="admin-users">
      <div class="admin-tweets-container">
        <div class="admin-tweets-title">
          <p>推文清單</p>
        </div>
        <!-- list-card -->

        <div class="user-cards-container">
          <router-link
            to="/users/:id"
            class="user-profile-link"
            v-for="user in adminUsers"
            :key="user.id"
          >
            <div class="user-profile-card">
              <div class="cover-part">
                <img :src="user.cover" class="cover-img" alt="cover" />
              </div>
              <div class="user-img-part">
                <img :src="user.avatar" class="user-main-img" alt="user-img" />
              </div>
              <div class="detail-info-part">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-account">{{ user.account }}</div>
                <div class="user-action">
                  <div class="user-reply" @click="showReplyModal">
                    <img
                      src="https://i.imgur.com/SaR8cz3.png"
                      class="reply"
                      alt="reply"
                    />
                    <span class="reply-count">{{ user.Replies.length }}</span>
                  </div>
                  <div class="user-like">
                    <img
                      src="https://i.imgur.com/qs9Pe3N.png"
                      class="like"
                      alt="like"
                    />
                    <span class="like-count">{{ user.Likes.length }}</span>
                  </div>
                </div>
                <div class="follow-info">
                  <router-link
                    to="/users/:id/followings"
                    class="followings-link"
                    ><div class="followings">
                      <strong>{{ user.Followings.length }}個</strong>追蹤中
                    </div></router-link
                  >
                  <router-link to="/users/:id/followers" class="followers-link"
                    ><div class="followers">
                      <strong>{{ user.Followers.length }}位</strong>追蹤者
                    </div></router-link
                  >
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
const dummyUsers = [
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
    Replies: [
      {
        id: 53,
        UserId: 5,
        TweetId: 18,
        comment: "Quisquam aut quas eos ea deserunt et repudiandae.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 59,
        UserId: 5,
        TweetId: 20,
        comment:
          "Doloremque in est exercitationem itaque esse et. Odit voluptas exercitationem eum expedita ea deserunt dolore pariatur facere. Non odit est sunt in culpa est ad.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 61,
        UserId: 5,
        TweetId: 21,
        comment: "fugiat",
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
        id: 81,
        UserId: 5,
        TweetId: 27,
        comment:
          "Enim maxime quia alias dolores expedita exercitationem. Quis consectetur earum aut. Natus iure nesciunt est repellendus.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 83,
        UserId: 5,
        TweetId: 28,
        comment:
          "Fuga at voluptatem aut sed possimus in distinctio sequi. Minima qui illum quod. Molestiae excepturi sunt occaecati sit cumque consequatur nostrum tempora soluta.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 86,
        UserId: 5,
        TweetId: 29,
        comment: "sit sequi accusamus",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 92,
        UserId: 5,
        TweetId: 31,
        comment: "a beatae similique",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
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
        id: 99,
        UserId: 5,
        TweetId: 33,
        comment:
          "Ratione eos vel. Ut vel ea perferendis error sed. Rerum enim labore possimus iste quis nemo architecto aut numquam.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 102,
        UserId: 5,
        TweetId: 34,
        comment: "dignissimos ut culpa",
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
        id: 107,
        UserId: 5,
        TweetId: 36,
        comment: "odio",
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
        id: 122,
        UserId: 5,
        TweetId: 41,
        comment:
          "Quas nesciunt commodi aperiam numquam.\nArchitecto ducimus assumenda.\nLabore laboriosam autem voluptates ratione.\nRepudiandae neque eius saepe.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 128,
        UserId: 5,
        TweetId: 43,
        comment: "voluptatem",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 132,
        UserId: 5,
        TweetId: 44,
        comment:
          "Sunt omnis voluptas omnis rem qui quis fugiat. Dignissimos ut qui cupiditate iure dolor sit voluptate laborum.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 135,
        UserId: 5,
        TweetId: 45,
        comment: "dolores aut eum",
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
        id: 150,
        UserId: 5,
        TweetId: 50,
        comment:
          "Dolor itaque magnam inventore suscipit deserunt ipsam.\nRerum ab aut amet.\nVelit qui error perspiciatis distinctio aspernatur cumque quos doloribus.\nQuis vitae eos modi sit est.\nEt asperiores necessitatibus dignissimos recusandae fugiat ut ea enim.",
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
        id: 21,
        UserId: 5,
        TweetId: 7,
        comment:
          "Nobis sed eveniet earum rerum. Aliquid id odit quo delectus sunt optio ipsum facere culpa. Voluptatem sint et magnam quo non maiores eveniet et et.\n \rEst facilis quasi occaecati cum dolorem pariatur. Et est ipsum occaecati. Porro et quis fugiat eum. Magnam pariatur eum. Rem adipisci ut minima repellat incidunt est sequi accusantium. A vel in aspernatur consequatur.\n \rRerum est dicta nesciunt omnis numquam. Accusantium sed voluptates aut nobis quia. Delectus ad vel. Pariatur eveniet vitae.",
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
        id: 28,
        UserId: 5,
        TweetId: 10,
        comment:
          "Debitis tempora explicabo. Modi omnis pariatur sed consequuntur. Non a voluptas porro enim. Aut ipsa quia quisquam ad illum laboriosam molestiae dolor. Dolor est sed culpa ad fugiat harum iure in a. Et aperiam maiores.\n \rNumquam molestiae cum sed dignissimos rerum dolorem possimus. Commodi rerum voluptas. Voluptatibus nemo magnam mollitia vel voluptatem inventore nihil aut sint. Inventore et ipsa maxime.\n \rVeniam eaque laudantium rerum corporis corporis. Modi molestiae debitis aliquam illum aperiam nulla quas numquam voluptas. Delectus ratione magni assumenda.",
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
        id: 46,
        UserId: 5,
        TweetId: 16,
        comment: "reprehenderit",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 49,
        UserId: 5,
        TweetId: 17,
        comment:
          "Quasi veritatis quis rerum ipsa occaecati ex exercitationem porro placeat. Debitis ullam in laborum aliquid vel illum vero. Quis quam sapiente nisi impedit id repellat. Minima aut et magni amet temporibus quibusdam dolores.",
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
      {
        id: 7,
        UserId: 5,
        TweetId: 15,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    ],
    Followers: [
      {
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
        Followship: {
          followerId: 4,
          followingId: 5,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
      {
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
        Followship: {
          followerId: 3,
          followingId: 5,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
    Followings: [
      {
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
        Followship: {
          followerId: 5,
          followingId: 4,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
      {
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
        Followship: {
          followerId: 5,
          followingId: 2,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
  },
  {
    id: 6,
    email: "user5@example.com",
    password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
    name: "user5",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
    introduction: "I am user5",
    role: "user",
    account: "@user5",
    cover: "http://lorempixel.com/640/480/fashion",
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
        id: 8,
        UserId: 6,
        TweetId: 3,
        comment: "nostrum",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
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
        id: 18,
        UserId: 6,
        TweetId: 6,
        comment: "porro",
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
        id: 25,
        UserId: 6,
        TweetId: 9,
        comment: "Ab tenetur odit asperiores ut.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 32,
        UserId: 6,
        TweetId: 11,
        comment:
          "Eius modi blanditiis excepturi odio qui ipsa aut quaerat provident.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 43,
        UserId: 6,
        TweetId: 15,
        comment: "Ut doloremque temporibus saepe.",
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
      {
        id: 55,
        UserId: 6,
        TweetId: 19,
        comment: "velit vel aliquam",
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
      {
        id: 72,
        UserId: 6,
        TweetId: 24,
        comment:
          "Sit sit maxime voluptas voluptatem quidem magnam facere. Voluptatem fuga iste vero illo. Commodi minima nemo sunt consequatur est sint dicta in quaerat. Ut et doloribus dolorem magnam repellendus. Ut excepturi illo autem facere et cumque sunt inventore esse. Rerum hic doloribus quia perspiciatis ut.\n \rDistinctio tempora totam. Eum aperiam libero cum necessitatibus dolor alias est fuga est. Sit et id magnam suscipit et. Beatae corporis et. Sunt illum illo quo voluptatem temporibus error similique. Molestiae iusto distinctio velit ducimus animi.\n \rDignissimos excepturi quam hic ea neque itaque. Aut sit reiciendis omnis reiciendis fugiat dignissimos iure et. At est possimus consequatur. Sapiente aut error sunt. Fuga voluptas doloribus est. Eius iusto consequuntur doloremque repellendus consectetur enim alias quasi incidunt.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
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
        id: 84,
        UserId: 6,
        TweetId: 28,
        comment:
          "Sit praesentium rerum labore rerum molestiae harum quam est. Maiores quidem magni qui maiores voluptatem omnis. Atque incidunt et fuga. Eum inventore hic qui similique deserunt dolores consequatur earum.\n \rBlanditiis nam dolore atque non rem dolor quo maiores. Commodi voluptatibus quisquam mollitia dolore officiis laboriosam. Hic et voluptatibus molestias porro aut ut. Necessitatibus voluptatem maxime et enim est beatae.\n \rLaudantium itaque dolor. Itaque odit at distinctio ut omnis eos. Molestiae molestias autem. Doloribus recusandae commodi est est nisi consequatur molestias asperiores sit.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 93,
        UserId: 6,
        TweetId: 31,
        comment:
          "Pariatur dolores et expedita dolore dolor eaque blanditiis. Dolorem molestias voluptas consectetur sint incidunt molestias quis in. Facilis consequuntur quae maxime earum rerum vero.\n \rFugiat ex accusamus repellendus neque molestiae. Sunt eum in facere dicta est omnis facilis eum. Et delectus ducimus. Ut sint nam qui sed consequuntur non.\n \rDolores ipsa est voluptatem debitis nesciunt quod laudantium. Soluta eum sint. Dolorem ex sapiente. Atque quasi laudantium quia deserunt autem. Ullam nihil veniam sequi consequuntur cum illo neque.",
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
        id: 97,
        UserId: 6,
        TweetId: 33,
        comment: "Voluptatem quia et repellendus.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 101,
        UserId: 6,
        TweetId: 34,
        comment: "Reprehenderit et velit unde ut maxime cum.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 109,
        UserId: 6,
        TweetId: 37,
        comment:
          "Ex repudiandae quia pariatur aspernatur omnis nostrum illo. Cupiditate fuga atque saepe est qui sapiente. Officiis quaerat sunt ut maiores ullam facere beatae accusantium. Voluptatem corrupti veritatis occaecati. Eos autem aut dolorum est sapiente ipsa eaque.",
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
      {
        id: 115,
        UserId: 6,
        TweetId: 39,
        comment:
          "Impedit quis dolorum distinctio tempora. Ut ducimus asperiores fuga minima consequatur nulla. Ad sed rerum omnis id. Vel dolores nulla neque perspiciatis. Quae ab deserunt consequatur et hic necessitatibus.\n \rEt sit assumenda earum et nisi doloremque. Voluptatibus qui voluptate veritatis tempora non. Dolor magnam iure numquam fugit explicabo. Consequatur est nemo eum ut ut rerum. Rerum expedita provident quia soluta perferendis ipsa quasi est. Ipsum quae sit quibusdam maxime sit in accusantium pariatur laborum.\n \rMaiores ut eos iusto quia sed sit fuga et ut. Tempora quidem et accusamus et eum earum ut in. Sit molestiae eius. Qui id voluptas itaque consequatur veritatis.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 118,
        UserId: 6,
        TweetId: 40,
        comment: "Corrupti deserunt debitis eum.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 130,
        UserId: 6,
        TweetId: 44,
        comment:
          "Ut laboriosam laborum sint non dolor.\nAdipisci vel quae ut.\nVelit quam sint alias quis rem odit assumenda praesentium.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 133,
        UserId: 6,
        TweetId: 45,
        comment: "Possimus sint cum autem modi temporibus in.",
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
      {
        id: 141,
        UserId: 6,
        TweetId: 47,
        comment:
          "Vero facilis id a dignissimos qui doloribus iusto. Velit laboriosam corporis distinctio consectetur reiciendis quia doloremque. Iure voluptatem ea voluptatibus consequatur harum.\n \rLabore et qui. In et corporis dolorum commodi praesentium dolorum. Eos deserunt dolor aut. Iure voluptatem dolore ullam ut. Nesciunt ratione omnis quaerat in enim occaecati doloremque voluptatem incidunt. Modi at dolores animi sed minima sequi id exercitationem.\n \rHic maiores est optio quibusdam. Aut architecto quos qui nostrum itaque porro sit adipisci. Laborum excepturi sed.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 144,
        UserId: 6,
        TweetId: 48,
        comment:
          "Vel voluptates et vel nulla ipsa accusamus perspiciatis ut est. Ipsum fugiat saepe. Odit est non et numquam amet quia cupiditate. Unde expedita laudantium. Aliquid necessitatibus sed ut et dignissimos aperiam.\n \rOdio tempora doloremque cupiditate nulla enim ab. Dolore tempore nihil atque nisi sint laudantium suscipit voluptas. Non eius impedit dolor sit vel et incidunt et. Iste voluptates enim culpa sit quae nostrum tempora possimus. Sunt aut impedit quia incidunt velit molestiae sunt atque nisi. Pariatur similique dolores quo.\n \rPorro aut ducimus quam. Nisi laudantium consectetur harum vel aut illum sed nam. Omnis voluptates consequuntur.",
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
        id: 149,
        UserId: 6,
        TweetId: 50,
        comment:
          "Quia repellendus a saepe dolore aperiam facilis ut dignissimos. Consequuntur consequuntur qui et in explicabo error labore. Voluptas est quas recusandae ipsum. Assumenda quae voluptate est iure numquam aut.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [
      {
        id: 4,
        UserId: 6,
        TweetId: 1,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    ],
    Followers: [],
    Followings: [],
  },
  {
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
        id: 145,
        UserId: 2,
        TweetId: 49,
        comment: "Laborum amet eos rem eaque praesentium non magni.",
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
        id: 11,
        UserId: 2,
        TweetId: 4,
        comment:
          "Officia qui dignissimos. Aut velit ea voluptates non quas. Quaerat voluptate commodi.\n \rNumquam ratione minima quia fugiat enim. Aliquid ut praesentium. Mollitia sint ut deserunt quasi omnis est eius veritatis praesentium. Ullam doloremque consequatur. Aliquam qui non enim similique quis ab. Explicabo pariatur aut optio.\n \rLaborum dolores et incidunt. Sed nihil voluptas. Fugit culpa ipsam eligendi omnis voluptatem rerum. Similique ducimus qui in omnis. Dolor recusandae quo ipsam quae enim pariatur est. Repellat nam qui.",
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
        id: 22,
        UserId: 2,
        TweetId: 8,
        comment:
          "Sequi voluptate est fuga. Occaecati expedita laboriosam nisi corporis doloribus. Laudantium voluptatibus similique molestiae et. Error rerum et quia eaque est repellendus officiis et.",
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
        id: 35,
        UserId: 2,
        TweetId: 12,
        comment:
          "Et aut distinctio non iste quae voluptas sed. Aut et et autem velit ut pariatur quia. Cupiditate est voluptas illo non.\n \rQuia et velit rerum atque quasi porro voluptatem. Modi consequatur totam laudantium voluptatem. Dolorum qui nisi et sit harum et nobis. Sit ad natus natus quia reiciendis facilis et. Enim beatae culpa quisquam neque.\n \rMaxime veritatis ducimus repellat dicta quod dolorem voluptatum cupiditate. Sunt doloremque in quo impedit et. Consectetur dolore in voluptatibus cum ut ut optio aliquam.",
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
        id: 44,
        UserId: 2,
        TweetId: 15,
        comment:
          "Quibusdam est ut debitis alias quae voluptas voluptas assumenda animi. Aspernatur ut et rem sit est. Nostrum ratione cum tenetur non. Neque rerum mollitia doloremque. Maiores ex esse ratione eius magni.\n \rVel incidunt facilis ut omnis. Hic omnis tempora sit enim officia suscipit. Recusandae officiis sint veritatis consequatur atque aliquid. Numquam facilis quaerat animi explicabo reiciendis fuga molestiae voluptatum.\n \rDignissimos enim cum architecto hic. Sed sint iste quas aliquam dolorem voluptatibus. At eveniet doloremque quidem placeat dolorem recusandae.",
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
        id: 52,
        UserId: 2,
        TweetId: 18,
        comment: "A minus et voluptatum excepturi.",
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
        id: 62,
        UserId: 2,
        TweetId: 21,
        comment:
          "Odio quia ipsum labore quis placeat et distinctio fuga. Aliquam neque enim doloribus. Et tempora vero nam in facilis occaecati fugit non. Maiores at aut facilis molestiae aut.",
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
        id: 67,
        UserId: 2,
        TweetId: 23,
        comment:
          "Officia sit ipsum rem et excepturi rem rerum tempore. Nihil aut ea. Pariatur repudiandae natus aut. Magni consequatur porro sit laboriosam eaque repellat.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 70,
        UserId: 2,
        TweetId: 24,
        comment: "sed",
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
      {
        id: 76,
        UserId: 2,
        TweetId: 26,
        comment: "Totam rerum molestias.",
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
        id: 89,
        UserId: 2,
        TweetId: 30,
        comment: "Excepturi in excepturi sed non laborum itaque.",
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
      {
        id: 105,
        UserId: 2,
        TweetId: 35,
        comment:
          "Saepe modi unde et quam a incidunt atque. Nobis nemo est magni qui quis. Odio quae et distinctio. Et facilis quis possimus voluptas vero tempora perspiciatis dicta occaecati.\n \rVeritatis hic dolor reiciendis hic ut voluptas voluptatibus animi. Doloribus doloribus sunt id ut. Consectetur qui non et.\n \rSunt voluptates amet amet aliquam nam vitae consectetur. Hic excepturi autem non dolores sint. Aut omnis nostrum culpa necessitatibus nam esse totam inventore aut. Voluptas optio quia quisquam cumque est aut fugit aut voluptatem. Similique nemo veniam. A omnis in reiciendis rerum neque laudantium enim.",
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
        id: 120,
        UserId: 2,
        TweetId: 40,
        comment:
          "Ut dignissimos omnis. Vitae iste et non illum culpa sit. Quasi deserunt corrupti et est velit debitis quasi a fugiat. Inventore doloribus iusto. Sed voluptatem magni deserunt. Esse impedit iure quidem nulla magnam quidem non adipisci.\n \rEt ullam consectetur modi eos rerum qui qui doloremque quia. Quia facere esse totam repellat quae alias. Consequatur soluta omnis distinctio rerum repellendus qui.\n \rQuo earum explicabo dolorem sit. Architecto perspiciatis maiores ea molestiae quia voluptates. Beatae aut est. Id enim culpa maiores voluptas incidunt architecto.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 121,
        UserId: 2,
        TweetId: 41,
        comment: "fuga",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
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
        id: 136,
        UserId: 2,
        TweetId: 46,
        comment: "sint",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [
      {
        id: 2,
        UserId: 2,
        TweetId: 44,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
      {
        id: 1,
        UserId: 2,
        TweetId: 1,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    ],
    Followers: [
      {
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
        Followship: {
          followerId: 5,
          followingId: 2,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
      {
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
        Followship: {
          followerId: 3,
          followingId: 2,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
    Followings: [
      {
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
        Followship: {
          followerId: 2,
          followingId: 4,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
      {
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
        Followship: {
          followerId: 2,
          followingId: 3,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
  },
  {
    id: 3,
    email: "user2@example.com",
    password: "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
    name: "user2",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
    introduction: "I am user2",
    role: "user",
    account: "@user2",
    cover: "http://lorempixel.com/640/480/food",
    createdAt: "2020-10-01T08:02:45.000Z",
    updatedAt: "2020-10-01T08:02:45.000Z",
    Replies: [
      {
        id: 2,
        UserId: 3,
        TweetId: 1,
        comment: "sit error et",
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
        id: 9,
        UserId: 3,
        TweetId: 3,
        comment: "eius",
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
      {
        id: 16,
        UserId: 3,
        TweetId: 6,
        comment: "Numquam odit expedita voluptatem quae qui.",
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
      {
        id: 33,
        UserId: 3,
        TweetId: 11,
        comment: "velit",
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
      {
        id: 41,
        UserId: 3,
        TweetId: 14,
        comment: "Ex voluptatum veritatis dicta velit.",
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
      {
        id: 51,
        UserId: 3,
        TweetId: 17,
        comment:
          "Quam eum alias quia minima rem culpa. Id ex commodi dolores sunt ex voluptatem. Esse rerum perferendis qui beatae rerum. Natus fugit facere fuga totam. Consectetur et commodi voluptatem eum occaecati culpa suscipit. Cumque et repellat nostrum corporis sed et dolorem debitis.\n \rOccaecati rerum repellendus omnis aut molestiae quidem. Doloremque voluptatem ex itaque accusamus nisi veritatis assumenda error. Ducimus delectus iste omnis et quas. Beatae similique atque fugit libero occaecati omnis quasi.\n \rRerum enim qui repellat placeat. Accusantium velit cupiditate repudiandae et. Aspernatur pariatur corrupti nemo ut voluptatem recusandae est sed vel. Voluptatem quisquam architecto natus.",
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
      {
        id: 58,
        UserId: 3,
        TweetId: 20,
        comment:
          "Nihil quibusdam aut numquam voluptas nesciunt odit exercitationem quia libero. Quia excepturi eius quia totam ipsam ab esse modi ipsa. Saepe amet laborum aut facilis. Dicta optio dolor ut. Nam doloribus et autem odio odio dolorem quia. Mollitia quibusdam officiis non quam ut est deserunt quisquam eveniet.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 64,
        UserId: 3,
        TweetId: 22,
        comment: "Autem qui magni aliquam modi necessitatibus.",
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
        id: 73,
        UserId: 3,
        TweetId: 25,
        comment: "qui commodi quia",
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
      {
        id: 85,
        UserId: 3,
        TweetId: 29,
        comment:
          "Minus voluptate pariatur voluptas molestias.\nHarum pariatur quo velit.\nNesciunt ipsa optio eius pariatur quasi enim inventore odit.\nQuia praesentium hic quae culpa voluptas in.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 88,
        UserId: 3,
        TweetId: 30,
        comment: "doloremque nisi sit",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 91,
        UserId: 3,
        TweetId: 31,
        comment:
          "Modi similique consectetur ut doloribus eum quia. Sunt dignissimos et ipsam fugit neque impedit omnis sint cupiditate. Quia culpa nisi saepe et. Maxime occaecati et non in sit voluptas qui odit. Dolores voluptas qui dignissimos dolore possimus fugiat dolor.\n \rQuidem accusantium optio ut nulla a. Natus ut rerum error et et a. Fuga qui veniam. Tenetur illo qui officia. Odio dignissimos quo at commodi.\n \rEt tempora qui corporis temporibus eos praesentium nemo incidunt. Cum consectetur molestiae. Est totam qui dolor ipsam deserunt ab molestiae. Reprehenderit ipsum accusamus animi.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
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
        id: 106,
        UserId: 3,
        TweetId: 36,
        comment: "Iste eius nisi quos eos saepe magnam.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 111,
        UserId: 3,
        TweetId: 37,
        comment:
          "Ut nostrum odit voluptatum id aut sit et saepe eaque.\nIn ipsa impedit ab voluptates alias iusto.\nFuga illo aut.\nVel vel libero.\nIn recusandae id.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 116,
        UserId: 3,
        TweetId: 39,
        comment: "animi omnis eaque",
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
      {
        id: 129,
        UserId: 3,
        TweetId: 43,
        comment: "vitae mollitia consequatur",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 131,
        UserId: 3,
        TweetId: 44,
        comment: "Voluptatem quisquam saepe et enim est minima mollitia dolor.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 134,
        UserId: 3,
        TweetId: 45,
        comment:
          "Commodi asperiores ut voluptatibus et. Sit voluptatem magni rerum nihil harum dolores laudantium. Similique ut ad qui et. Sed autem culpa dolores doloremque. Soluta et velit numquam aut ex.\n \rInventore aut doloremque iusto est dolorem corporis necessitatibus voluptas dicta. Ut quae dicta rem eveniet totam. Ratione corrupti voluptatem quas quod id sint voluptatum. Vel sed dolor delectus labore reprehenderit voluptates alias.\n \rFugit error et iste odio numquam veniam. Commodi consequatur perspiciatis autem aut voluptatem voluptatem cum. Soluta quas neque ut aspernatur. Et ut sit quas explicabo quia mollitia.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 142,
        UserId: 3,
        TweetId: 48,
        comment: "sapiente consequatur non",
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
      {
        id: 148,
        UserId: 3,
        TweetId: 50,
        comment: "eos",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [
      {
        id: 3,
        UserId: 3,
        TweetId: 1,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    ],
    Followers: [
      {
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
        Followship: {
          followerId: 2,
          followingId: 3,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
    Followings: [
      {
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
        Followship: {
          followerId: 3,
          followingId: 5,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
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
        id: 10,
        UserId: 4,
        TweetId: 4,
        comment: "Minima quo consequatur.",
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
        id: 19,
        UserId: 4,
        TweetId: 7,
        comment: "non non ut",
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
      {
        id: 30,
        UserId: 4,
        TweetId: 10,
        comment: "Eos eius laudantium ipsum dolor.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 31,
        UserId: 4,
        TweetId: 11,
        comment:
          "Iure voluptas voluptate aliquam aspernatur facere sequi consequuntur enim magni. Et eos est ut suscipit natus. Veniam repudiandae enim asperiores sed cupiditate.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 34,
        UserId: 4,
        TweetId: 12,
        comment: "velit",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
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
        id: 42,
        UserId: 4,
        TweetId: 14,
        comment: "harum",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 50,
        UserId: 4,
        TweetId: 17,
        comment:
          "Est id saepe ratione veniam eius non aut consequuntur inventore.",
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
      {
        id: 60,
        UserId: 4,
        TweetId: 20,
        comment:
          "Voluptates sit laboriosam quia aut totam est quidem ut. Voluptates esse ipsam id at aut. Enim expedita dolor.\n \rEt dolorum laboriosam dolores ipsa consequatur provident et quos. Corrupti nesciunt fugiat animi sit aperiam nisi sit iste laboriosam. Ex sint ullam est laborum. Et non ea. Iusto ab cupiditate nemo ea qui iure autem.\n \rConsequatur occaecati esse eveniet excepturi. Est distinctio pariatur velit sequi similique et. Qui voluptatem quasi qui voluptates aut cum aut. Suscipit tempore provident doloremque labore ratione. Recusandae ut labore eos quo. Assumenda rem et quia aut consequatur quidem tempore.",
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
        id: 77,
        UserId: 4,
        TweetId: 26,
        comment:
          "Eos est numquam rerum dolorem ut ut voluptatum deleniti. Nobis ipsa corrupti occaecati voluptates. Animi consequatur porro occaecati. Officiis voluptate aut explicabo molestias porro tempora corrupti voluptatem dolorum. Quis quam ipsa sed amet. Doloribus rem veniam.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 82,
        UserId: 4,
        TweetId: 28,
        comment: "ipsum velit in",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 87,
        UserId: 4,
        TweetId: 29,
        comment:
          "Odit aut esse qui id eum voluptas quo quidem molestiae. Provident nulla incidunt. Illum excepturi esse sapiente maxime alias.",
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
      {
        id: 98,
        UserId: 4,
        TweetId: 33,
        comment: "Quae non et molestias dolor.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 100,
        UserId: 4,
        TweetId: 34,
        comment: "ullam",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 110,
        UserId: 4,
        TweetId: 37,
        comment:
          "Sed enim sit. Labore iste assumenda id sunt fugiat. Ipsum officia eligendi veritatis dolores ea vitae rerum.\n \rMinima vero accusamus nihil natus aut voluptatibus. Nisi quia magnam ab velit rerum. Suscipit beatae qui aspernatur ut voluptas alias debitis aliquid. Vero inventore repudiandae veniam nesciunt aspernatur repudiandae nesciunt sed.\n \rSaepe ullam recusandae aut reprehenderit voluptates sint ab. Fuga et ipsam nesciunt. Quam similique voluptatum quaerat commodi libero voluptatem temporibus quae.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 112,
        UserId: 4,
        TweetId: 38,
        comment: "cumque tenetur dolorem",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 117,
        UserId: 4,
        TweetId: 39,
        comment:
          "Reprehenderit maxime iusto tempora amet.\nDolorum et officia possimus esse ex similique officia ea veritatis.\nId itaque qui non.",
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
      {
        id: 125,
        UserId: 4,
        TweetId: 42,
        comment: "rerum",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      {
        id: 127,
        UserId: 4,
        TweetId: 43,
        comment:
          "Voluptatem molestiae illo. Voluptatem ratione voluptate exercitationem magni ipsa voluptatem voluptates. Sed et aut inventore voluptate dicta non. Debitis qui aut omnis omnis itaque aut quod. Asperiores saepe necessitatibus.\n \rSequi ipsum dolorem assumenda sit tempora odit magni architecto et. Sint ducimus quas rerum eum in odit voluptatum. Laboriosam quos placeat harum magnam assumenda. Suscipit nemo voluptas doloribus quisquam ut maiores. Ipsum est at placeat error aut ea sit magnam voluptate.\n \rVoluptate rem fugit. Quo quia laudantium illo. Incidunt est rem et id. Distinctio ipsam distinctio praesentium eos suscipit dolores. Ea quo ratione aut dolorum. Qui quos pariatur eos id incidunt voluptas ab ut illo.",
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
        id: 143,
        UserId: 4,
        TweetId: 48,
        comment: "Rerum asperiores eligendi deleniti temporibus.",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
    ],
    Likes: [
      {
        id: 5,
        UserId: 4,
        TweetId: 30,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
      {
        id: 6,
        UserId: 4,
        TweetId: 29,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    ],
    Followers: [
      {
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
        Followship: {
          followerId: 2,
          followingId: 4,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
      {
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
        Followship: {
          followerId: 5,
          followingId: 4,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
    Followings: [
      {
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
        Followship: {
          followerId: 4,
          followingId: 5,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
  },
  {
    id: 1,
    email: "root@example.com",
    password: "$2a$10$7ZyFXDomHySoaTos5kGHIeeQz7xEgqnGZDeaotWdeb5WFbJJD5opW",
    name: "root",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/sgaurav_baghel/128.jpg",
    introduction: "I am root.",
    role: "admin",
    account: "@root",
    cover: "http://lorempixel.com/640/480/animals",
    createdAt: "2020-10-01T08:02:44.000Z",
    updatedAt: "2020-10-01T08:02:44.000Z",
    Replies: [],
    Likes: [],
    Followers: [],
    Followings: [],
  },
];
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      isAdmin: true,
      adminUsers: [],
    };
  },
  created() {
    this.fetchAdminUsers();
  },
  methods: {
    fetchAdminUsers() {
      this.adminUsers = dummyUsers;
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
}
.admin-users {
  width: auto;
  height: auto;
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

.user-cards-container {
  width: 1200px;
  height: auto;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
}
.user-profile-link {
  width: 245px;
  height: 314px;
  margin-right: 10px;
  margin-top: 10px;
}
.user-profile-card {
  width: 245px;
  height: 314px;
  border-radius: 10%;
  position: relative;
  background: #f6f7f8;
}
.cover-part,
.cover-img {
  width: 245px;
  height: 140px;
}
.cover-img {
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.user-img-part {
  background: #ffffff;
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  left: 67px;
  top: 70px;
}
.user-main-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.reply,
.like {
  width: 19.75px;
  height: 19.75px;
}

.detail-info-part {
  display: flex;
  flex-direction: column;
  margin-top: 45px;
  align-items: center;
}

.user-reply,
.user-like,
.follow-info {
  display: flex;
}
.user-action {
  display: flex;
  justify-content: space-around;
  width: 120px;
  margin: 10px 0;
}
.like-count,
.reply-count {
  color: #1c1c1c;
  font-weight: 500;
  font-size: 15px;
  margin: 0 5px;
}
.user-name {
  font-size: 15px;
  font-weight: 900;
}
.user-account {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.followings,
.followers {
  font-size: 15px;
  margin: 0 5px;
}
</style>