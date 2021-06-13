/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()



async function main() {
  const uuidAnonymous = '11111111-1111-1111-1111-111111111111' // anonymous
  const uuidSandro = 'dfa8ca9c-b845-4d2f-8d7b-bd6cedb75047' // sandro

  await db.user.create({
    data: { uuid: uuidAnonymous },
  })

  await db.user.create({
    data: { uuid: uuidSandro },
  })

  await db.userRole.create({
    data: {
      name: 'admin',
      user: {
        connect: { uuid: uuidSandro },
      },
    },
  })

  // posts
  await db.post.create(
    {
      data:
        {
          title: 'In suscipit tellus convallis scelerisque consequat',
          body: 'Etiam pellentesque non nibh non pulvinar. Mauris posuere, tellus sit amet tempus vestibulum.',
          imageUrl: 'https://images.unsplash.com/photo-1458080464185-b0ebf9ede5cb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80',
        }
    }
  )
  await db.post.create(
    {
      data:
        {
          title: 'Quick problem-solving contact',
          body: 'Etiam pellentesque non nibh non pulvinar. Mauris posuere, tellus sit amet tempus vestibulum.',
          imageUrl: 'https://images.unsplash.com/photo-1458080767772-b1011d305557?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1043&amp;q=80',
        }
    }
  )
  await db.post.create(
    {
      data:
        {
          title: 'Donec nec cursus nulla, quis aliquet ipsum',
          body: 'Etiam pellentesque non nibh non pulvinar. Mauris posuere, tellus sit amet tempus vestibulum.',
          imageUrl: 'https://images.unsplash.com/photo-1530389912609-9a007b3c38a4?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80',
        }
    }
  )
  await db.post.create(
    {
      data:
        {
          title: 'Fusce at condimentum diam',
          body: 'Etiam pellentesque non nibh non pulvinar. Mauris posuere, tellus sit amet tempus vestibulum.',
          imageUrl: 'https://images.unsplash.com/photo-1506464253090-7af30fe60a71?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80',
        }
    }
  )
  await db.post.create(
    {
      data:
        {
          title: 'Curabitur tortor erat, blandit sed tellus sed',
          body: 'Etiam pellentesque non nibh non pulvinar. Mauris posuere, tellus sit amet tempus vestibulum.',
          imageUrl: 'https://images.unsplash.com/photo-1581279219053-6c0ef420e10b?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80',
        }
    }
  )
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })


/*
  const POSTS = [
    {
      title: 'Welcome to the blog!',
      body:
        "I'm baby single- origin coffee kickstarter lo - fi paleo skateboard.Tumblr hashtag austin whatever DIY plaid knausgaard fanny pack messenger bag blog next level woke.Ethical bitters fixie freegan,helvetica pitchfork 90's tbh chillwave mustache godard subway tile ramps art party. Hammock sustainable twee yr bushwick disrupt unicorn, before they sold out direct trade chicharrones etsy polaroid hoodie. Gentrify offal hoodie fingerstache.",
    },
    {
      title: 'A little more about me',
      body:
        "Raclette shoreditch before they sold out lyft. Ethical bicycle rights meh prism twee. Tote bag ennui vice, slow-carb taiyaki crucifix whatever you probably haven't heard of them jianbing raw denim DIY hot chicken. Chillwave blog succulents freegan synth af ramps poutine wayfarers yr seitan roof party squid. Jianbing flexitarian gentrify hexagon portland single-origin coffee raclette gluten-free. Coloring book cloud bread street art kitsch lumbersexual af distillery ethical ugh thundercats roof party poke chillwave. 90's palo santo green juice subway tile, prism viral butcher selvage etsy pitchfork sriracha tumeric bushwick.",
    },
    {
      title: 'What is the meaning of life?',
      body:
        'Meh waistcoat succulents umami asymmetrical, hoodie post-ironic paleo chillwave tote bag. Trust fund kitsch waistcoat vape, cray offal gochujang food truck cloud bread enamel pin forage. Roof party chambray ugh occupy fam stumptown. Dreamcatcher tousled snackwave, typewriter lyft unicorn pabst portland blue bottle locavore squid PBR&B tattooed.',
    },
  ]

  async function main() {
    const existing = await db.post.findMany()

    for (let i = 0; i < POSTS.length; i++) {
      const post = POSTS[i]

      // only inserts a post if one with the exact same title doesn't already exist
      if (!existing.find((ex) => ex.title === post.title)) {
        await db.post.create({ data: post })
      }
    }
  }

  main()
    .catch((e) => console.error(e))
    .finally(async () => {
      await db.$disconnect()
    })
*/
