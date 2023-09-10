import Link from 'next/link'
import { draftMode } from 'next/headers'

import Date from './date'
import CoverImage from './cover-image'
import Avatar from './avatar'
import MoreStories from './more-stories'
import Product from './components/product'
import Tag from './components/tag'
import ScrollingMenu from './components/scrollingMenu'
import { Separator } from '@/components/ui/separator'

import { getAllPosts, getAllBeers } from '@/lib/api'
import { CMS_NAME, CMS_URL } from '@/lib/constants'

const mockProducts = [
  {
    name: 'Μπύρα Αλφα',
    price: '1.50€',
    description: 'Γεύση γλυκιά βύνη, λυκίσκος, ελαφριά μπαχαρικά. Είναι η ιδανική επιλογή για τους λάτρεις της ελαφριάς μπύρας. Η μακροχρόνια παράδοση στην παραγωγή της μπύρας και η μοναδική περίοδος 90 ημερών ωρίμανσης αυξάνουν το μοναδικό χαρακτήρα της. Ξηρή επίγευση μακράς διάρκειας και αρωματική.',
    countryOfOrigin: 'Ελλάδα',
    volume: '330ml',
    alcohol: '5%',
    tag: {
      name: 'Beers',
      slug: 'beers',
    }
  },
  {
    name: 'Μπύρα Αλφα',
    price: '1.50€',
    description: 'Γεύση γλυκιά βύνη, λυκίσκος, ελαφριά μπαχαρικά. Είναι η ιδανική επιλογή για τους λάτρεις της ελαφριάς μπύρας. Η μακροχρόνια παράδοση στην παραγωγή της μπύρας και η μοναδική περίοδος 90 ημερών ωρίμανσης αυξάνουν το μοναδικό χαρακτήρα της. Ξηρή επίγευση μακράς διάρκειας και αρωματική.',
    countryOfOrigin: 'Ελλάδα',
    volume: '330ml',
    alcohol: '5%',
    tag: {
      name: 'Beers',
      slug: 'beers',
    }
  },
  {
    name: 'CLASSIC BURGER',
    price: '6.00€',
    description: 'Μοσχαρίσιο μπιφτέκι 200gr, τυρί τσένταρ, μαρούλι, ντομάτα, κρεμμύδι, μουστάρδα, κέτσαπ, μαγιονέζα, σε ψωμάκι με σουσάμι.',
    tag: {
      name: 'Burgers',
      slug: 'burgers',
    }
  },
  {
    name: 'CLASSIC BURGER',
    price: '6.00€',
    description: 'Μοσχαρίσιο μπιφτέκι 200gr, τυρί τσένταρ, μαρούλι, ντομάτα, κρεμμύδι, μουστάρδα, κέτσαπ, μαγιονέζα, σε ψωμάκι με σουσάμι.',
    tag: {
      name: 'Burgers',
      slug: 'burgers',
    }
  },
  {
    name: 'CLASSIC BURGER',
    price: '6.00€',
    description: 'Μοσχαρίσιο μπιφτέκι 200gr, τυρί τσένταρ, μαρούλι, ντομάτα, κρεμμύδι, μουστάρδα, κέτσαπ, μαγιονέζα, σε ψωμάκι με σουσάμι.',
    tag: {
      name: 'Burgers',
      slug: 'burgers',
    }
  },
  {
    name: 'CLASSIC BURGER',
    price: '6.00€',
    description: 'Μοσχαρίσιο μπιφτέκι 200gr, τυρί τσένταρ, μαρούλι, ντομάτα, κρεμμύδι, μουστάρδα, κέτσαπ, μαγιονέζα, σε ψωμάκι με σουσάμι.',
    tag: {
      name: 'Burgers',
      slug: 'burgers',
    }
  },
  {
    name: 'CLASSIC BURGER',
    price: '6.00€',
    description: 'Μοσχαρίσιο μπιφτέκι 200gr, τυρί τσένταρ, μαρούλι, ντομάτα, κρεμμύδι, μουστάρδα, κέτσαπ, μαγιονέζα, σε ψωμάκι με σουσάμι.',
    tag: {
      name: 'Burgers',
      slug: 'burgers',
    }
  },
]

function groupByTag(products: any[]) {
  const grouped = products.reduce((acc, product) => {
    const { tag } = product
    if (!acc[tag.slug]) {
      acc[tag.slug] = []
    }
    acc[tag.slug].push(product)
    return acc
  }, {})
  return grouped
}

function getTags(products: any[]) {
  const tags = products.reduce((acc, product) => {
    const { tag } = product
    if (!acc[tag.slug]) {
      acc[tag.slug] = tag
    }
    return acc
  }, {})
  return Object.values(tags)
}

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{' '}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h2>
    </section>
  )
}

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string
  coverImage: any
  date: string
  excerpt: string
  author: any
  slug: string
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  )
}

export default async function Page() {
  const { isEnabled } = draftMode()
  const allPosts = await getAllPosts(isEnabled)
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)

  return (
    <div className="container mx-auto px-5">
      {/* <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <MoreStories morePosts={morePosts} /> */}
      <div className='flex flex-col items-center'>
        {/* {mockProducts.map((product, i) => {
          return (
            <div key={i} className="max-w-md">
              <Product {...product} />
              {i !== mockProducts.length - 1 && <Separator className="my-8" />}
            </div>
          )
        })} */}
        <ScrollingMenu tags={getTags(mockProducts)} />
        {Object.entries(groupByTag(mockProducts)).map(([tag, products]) => {
          return (
            <div key={tag} className="max-w-md">
              <Tag name={tag} slug={tag} />
              {products.map((product, i) => {
                return (
                  <div key={i} className="max-w-md">
                    <Product {...product} />
                    {i !== products.length - 1 && <Separator className="my-8" />}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
