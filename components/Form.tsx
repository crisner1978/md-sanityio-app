import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Post } from 'typings'

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: Post
}

const Form = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <>
      {submitted ? (
        <div className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
          <h3 className='text-3xl font-bold'>
            Thank you for submitting your comment!
          </h3>
          <p>Once approved, your comment will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="mt-2 py-3" />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <label className="label">
            <span className="formSpan">Name</span>
            <input
              {...register('name', { required: true })}
              name="name"
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-1"
              type="text"
              placeholder="John Wayne"
            />
          </label>
          <label className="label">
            <span className="formSpan">Email</span>
            <input
              {...register('email', { required: true })}
              name="email"
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-1"
              type="email"
              placeholder="John Wayne"
            />
          </label>
          <label className="label">
            <span className="formSpan">Comment</span>
            <textarea
              {...register('comment', { required: true })}
              name="comment"
              className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-1"
              placeholder="John Wayne"
              rows={8}
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">- The Name Field is required</span>
            )}
            {errors.email && (
              <span className="text-red-500">
                - The Email Field is required
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                - The Comment Field is required
              </span>
            )}
          </div>

          <input
            type="submit"
            className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 py-2
            px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
          />
        </form>
      )}
    </>
  )
}

export default Form

//

// const { mutateAsync } = useMutation((newNft) =>
//   fetch("/api/nfts", {
//     method: "POST",
//     body: JSON.stringify(newNft),
//   }),
//   {
//     onSuccess: (data) => {
//       toast.success("NFT Added to the Museum!")
//       router.push("/gallery")
//       reset();
//     }
//   },
//   {
//     onError: (error) => {
//       console.log(error)
//       toast.error("Failed to Add the NFT!")
//     }
//   }
// );

// async function onSubmit(data) {
//   const {
//     name,
//     description,
//     richDescription,
//     image_url,
//     images,
//     brand,
//     type,
//     price,
//     rating,
//     numReviews,
//     isFeatured,
//     dateCreated,
//     createdAt,
//   } = data;
//   const newNft = {
//     name,
//     description,
//     richDescription,
//     image_url,
//     images,
//     brand,
//     type,
//     price,
//     rating,
//     numReviews,
//     isFeatured,
//     dateCreated,
//     createdAt,
//     updatedAt: Date.now(),
//     purchased: false,
//   };
//   mutateAsync(newNft);
// }

// const Input = ({ name, label, type, placeholder, component }) => (
//   <div className="inputWrapper relative">
//     <label className="formLabel" htmlFor={label}>
//       {label}
//     </label>
//     {component ? (
//       component
//     ) : (
//       <input
//         {...register(name, { required: `${label} is required` })}
//         className="formInput bg-white "
//         type={type}
//         placeholder={placeholder}
//       />
//     )}

//     <span className="formErrorMsg">{errors[label]?.message}</span>
//   </div>
// );

// const Select = ({ label, items }) => (
//   <div className="inputWrapper">
//     <label className="formLabel" htmlFor={label}>
//       {label}
//     </label>
//     <select
//       {...register(label)}
//       className="formInput text-gray-500 bg-white "
//     >
//       {items.map(({ value, optionName }) => (
//         <option key={value} value={value}>
//           {optionName}
//         </option>
//       ))}
//     </select>
//   </div>
// );
// // <input type="url" name="" id="" />

// const Textarea = ({ name, label, placeholder }) => (
//   <div className="inputWrapper">
//     <label className="formLabel" htmlFor={name}>
//       <span>{label}</span>
//     </label>
//     <textarea
//       {...register(name, {
//         required: "is required",
//       })}
//       className="formInput bg-white "
//       placeholder={placeholder}
//       name={name}
//       cols="30"
//       rows="3"
//     />
//     <span className="formErrorMsg top-7 sm:top-0">
//       {errors[label]?.message}
//     </span>
//   </div>
// );
// // ok So Need ContractId, TokenId, Qty, Price($), Network (ethereum, gnosis, polygon, avalanche, solana), ListingDate, ExpirationDate
// const PersonalFields = () => (
//   <section>
//     <h3 className="titleField">NFT information</h3>
//     <Input label="name" name="name" type="text" placeholder="Name" />
//     <Textarea
//       name="description"
//       label="description"
//       placeholder="List all attributes"
//     />
//     <Input name="contractId" label="contract id" placeholder="Contract Id" />
//     <Input name="tokenId" label="token Id" type="text" placeholder="Token Id" />
//     <Input name="image_url" label="image-url" type="text" placeholder="Image Url" />
//     <Input name="quanity" label="quanity" type="text" placeholder="Quanity" />
//     <Input name="price" label="price" type="text" placeholder="$$$ Price " />
//     <Select label="Network" items={network} />
//     <Input name="listingDate" label="Listing Date" type="text" placeholder="NFT listing date" />
//     <Input name="expirationDate" label="Expiration Date" type="text" placeholder="NFT Expiration Date" />
//   </section>
// );

// return (
//   <div className="bg-gray-200 text-gray-600 px-2">
//     <BioText
//       title="Create NFT's"
//       description="Complete the following fields below to add the NFT to the Museum. If any data fields are missing or if you think that we need more attributes to describe the NFT's, please inform management. Adjustments can and will be made when neccessary."
//       description1="Your input is Vital, we value your feedback and Eric would love to hear from you! Thank You and start curating!!!"
//     />

//     <section className="pb-10 px-3 sm:px-8 md:px-16 max-w-2xl mx-auto">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="space-y-10 pb-20 max-w-2xl mx-auto"
//       >
//         <PersonalFields />
//         <div className="flex justify-center">
//           <button className="formSubmitBtn px-10" type="submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </section>
//   </div>
// );
