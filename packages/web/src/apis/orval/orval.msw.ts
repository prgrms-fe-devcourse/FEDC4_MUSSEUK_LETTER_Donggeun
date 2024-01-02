/**
 * Generated by orval v6.22.1 🍺
 * Do not edit manually.
 * Musseuk
 * Musseuk Letter API Docs
 * OpenAPI spec version: 1.0.0
 */
import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';

export const getPostAuthSignupMock = () => ({
  accessToken: faker.word.sample(),
  userId: faker.number.int({ min: undefined, max: undefined })
});

export const getPostAuthSigninMock = () => ({
  accessToken: faker.word.sample(),
  userId: faker.number.int({ min: undefined, max: undefined })
});

export const getPostAuthSignoutMock = () => ({ message: faker.word.sample() });

export const getGetAuthCheckMock = () => ({
  accessToken: faker.word.sample(),
  userId: faker.number.int({ min: undefined, max: undefined })
});

export const getPutAuthPasswordMock = () => ({ message: faker.word.sample() });

export const getGetUsersMock = () =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    commentCount: faker.number.int({ min: undefined, max: undefined }),
    imageName: faker.word.sample(),
    introduce: faker.word.sample(),
    name: faker.word.sample(),
    postCount: faker.number.int({ min: undefined, max: undefined }),
    slackId: faker.word.sample(),
    slackWorkspace: faker.word.sample(),
    userId: faker.number.int({ min: undefined, max: undefined }),
    username: faker.word.sample()
  }));

export const getGetUsersUserIdMock = () => ({
  commentCount: faker.number.int({ min: undefined, max: undefined }),
  imageName: faker.word.sample(),
  introduce: faker.word.sample(),
  name: faker.word.sample(),
  postCount: faker.number.int({ min: undefined, max: undefined }),
  slackId: faker.word.sample(),
  slackWorkspace: faker.word.sample(),
  userId: faker.number.int({ min: undefined, max: undefined }),
  username: faker.word.sample()
});

export const getPutUsersUserIdMock = () => ({
  commentCount: faker.number.int({ min: undefined, max: undefined }),
  imageName: faker.word.sample(),
  introduce: faker.word.sample(),
  name: faker.word.sample(),
  postCount: faker.number.int({ min: undefined, max: undefined }),
  slackId: faker.word.sample(),
  slackWorkspace: faker.word.sample(),
  userId: faker.number.int({ min: undefined, max: undefined }),
  username: faker.word.sample()
});

export const getGetPostsMock = () =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    authorId: faker.number.int({ min: undefined, max: undefined }),
    authorName: faker.word.sample(),
    commentCount: faker.number.int({ min: undefined, max: undefined }),
    content: faker.word.sample(),
    imageName: faker.word.sample(),
    postId: faker.number.int({ min: undefined, max: undefined }),
    title: faker.word.sample()
  }));

export const getPostPostsMock = () => ({ postId: faker.number.int({ min: undefined, max: undefined }) });

export const getGetPostsPostIdMock = () => ({
  authorId: faker.number.int({ min: undefined, max: undefined }),
  authorName: faker.word.sample(),
  comments: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    commentId: faker.number.int({ min: undefined, max: undefined }),
    imageName: faker.word.sample(),
    positionX: faker.number.int({ min: undefined, max: undefined }),
    positionY: faker.number.int({ min: undefined, max: undefined })
  })),
  content: faker.word.sample(),
  imageName: faker.word.sample(),
  postId: faker.number.int({ min: undefined, max: undefined }),
  title: faker.word.sample()
});

export const getGetPostsPostIdCommentsMock = () =>
  Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    author: faker.word.sample(),
    commentId: faker.number.int({ min: undefined, max: undefined }),
    content: faker.word.sample(),
    imageName: faker.word.sample(),
    positionX: faker.number.int({ min: undefined, max: undefined }),
    positionY: faker.number.int({ min: undefined, max: undefined })
  }));

export const getPostPostsPostIdCommentsMock = () => ({
  author: faker.word.sample(),
  commentId: faker.number.int({ min: undefined, max: undefined }),
  content: faker.word.sample(),
  imageName: faker.word.sample(),
  positionX: faker.number.int({ min: undefined, max: undefined }),
  positionY: faker.number.int({ min: undefined, max: undefined })
});

export const getGetCommentsCommentIdMock = () => ({
  author: faker.word.sample(),
  commentId: faker.number.int({ min: undefined, max: undefined }),
  content: faker.word.sample(),
  imageName: faker.word.sample(),
  positionX: faker.number.int({ min: undefined, max: undefined }),
  positionY: faker.number.int({ min: undefined, max: undefined })
});

export const getMusseukMock = () => [
  http.post('*/auth/signup', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getPostAuthSignupMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post('*/auth/signin', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getPostAuthSigninMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post('*/auth/signout', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getPostAuthSignoutMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/auth/check', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetAuthCheckMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.put('*/auth/password', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getPutAuthPasswordMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/users', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetUsersMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/users/:userId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetUsersUserIdMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.put('*/users/:userId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getPutUsersUserIdMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.put('*/users/:userId/photo', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.put('*/users/:userId/slack', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post('*/slack/verification', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/posts', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetPostsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post('*/posts', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getPostPostsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/posts/:postId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetPostsPostIdMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.put('*/posts/:postId', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.delete('*/posts/:postId', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/posts/:postId/comments', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetPostsPostIdCommentsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.post('*/posts/:postId/comments', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getPostPostsPostIdCommentsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.get('*/comments/:commentId', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getGetCommentsCommentIdMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }),
  http.delete('*/comments/:commentId', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
];
