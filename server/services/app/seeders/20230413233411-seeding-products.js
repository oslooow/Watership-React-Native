"use strict";

const productsData = [
  {
    name: "React Supabase Full Course",
    slug: "react-supabase-full-course",
    description:
      "Build and deploy a full-stack, production-ready web app with Supabase, React, and Postgres.",
    price: 140000,
    mainImg: "https://i.ytimg.com/vi/zBZgdTb-dns/maxresdefault.jpg",
    categoryId: 1,
    authorId: 1,
  },
  {
    name: "Modern JavaScript Full Course",
    slug: "modern-javascript-full-course",
    description: "Learn how to build real-world applications with JavaScript",
    price: 80000,
    mainImg: "https://i.ytimg.com/vi/DHjqpvDnNGE/maxresdefault.jpg",
    categoryId: 2,
    authorId: 1,
  },
  {
    name: "Next.js Firebase Full Course",
    slug: "next-js-firebase-full-course",
    description: "Build a full-stack app with React, Firebase, and Next.js",
    price: 120000,
    mainImg: "https://i.ytimg.com/vi/TNhaISOUy6Q/maxresdefault.jpg",
    categoryId: 1,
    authorId: 1,
  },
  {
    name: "Flutter Firebase",
    slug: "flutter-firebase",
    description: "Build a full-stack Flutter app with Firebase from scratch.",
    price: 100000,
    mainImg: "https://i.ytimg.com/vi/lHhRhPV--G0/maxresdefault.jpg",
    categoryId: 3,
    authorId: 1,
  },
  {
    name: "Python Django Full Course",
    slug: "python-django-full-course",
    description: "Learn how to build web applications with Python and Django",
    price: 90000,
    mainImg: "https://i.ytimg.com/vi/F5mRW0jo-U4/maxresdefault.jpg",
    categoryId: 2,
    authorId: 1,
  },
  {
    name: "GraphQL Full Course",
    slug: "graphql-full-course",
    description:
      "Learn how to build a GraphQL server and client with Node.js and React",
    price: 110000,
    mainImg: "https://i.ytimg.com/vi/ed8SzALpx1Q/maxresdefault.jpg",
    categoryId: 1,
    authorId: 1,
  },
  {
    name: "React - The full course",
    slug: "react---the-full-course",
    description:
      "Learn the fundamentals of React.js by building five apps from scratch.",
    price: "200000",
    mainImg: "https://img.youtube.com/vi/Tn6-PIqc4UM/maxresdefault.jpg",
    categoryId: "1",
    authorId: "1",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    let toSeed = productsData.map((ele) => {
      ele.updatedAt = ele.createdAt = new Date();
      return ele;
    });
    // console.log(toSeed);
    await queryInterface.bulkInsert("Products", toSeed, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
