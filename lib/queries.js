export const postQuery = `*[_type == "post"]{
  _id,
  title,
  description,
  mainImage,
  slug,
  author -> {
  name, 
  image,
  slug
  }
}`

export const pathQuery = `*[_type == "post"]{
  _id,
  slug,
}`

export const postSlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  description,
  mainImage,
  slug,
  body,
  author -> {
     name, 
     image,
     slug
  },
  'comments': *[
    _type == "comment" && 
    post._ref == ^._id && 
    approved == true],
}`