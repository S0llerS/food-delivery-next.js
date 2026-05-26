"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];

    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");

    const res = await fetch("https://api.cloudinary.com/v1_1/da3bv4pae/image/upload", {
      method: "POST",
      // headers: { "Content-Type": "multipart/form-data" },
      body: data,
    });

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();

      // router.push(`/product/${data.id}`);
      toast.success("The product has been added!");
    } catch (err) {
      console.log(err);
      toast.error("Failed! " + err);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 flex items-center justify-center text-green-500">
      <form className="flex flex-wrap gap-6" onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-2 text-gray-600 font-bold">
          Add New Product
        </h1>

        <div className="w-full flex flex-col gap-2 ring-1 p-2 rounded-sm">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/upload.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={handleChangeImg}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Title</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-green-400 p-2 rounded-sm"
            placeholder="French Fries"
            type="text"
            name="title"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Desc</label>
          <textarea
            onChange={handleChange}
            className="ring-1 ring-green-400 p-2 rounded-sm"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Price</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-green-400 p-2 rounded-sm"
            placeholder="17"
            type="number"
            name="price"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label>Category</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-green-400 p-2 rounded-sm"
            placeholder="protein"
            type="text"
            name="catSlug"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label>Options</label>
          <div className="flex gap-1">
            <input
              onChange={changeOption}
              className="ring-1 ring-green-400 p-2 rounded-sm"
              type="text"
              placeholder="Title"
              name="title"
            />
            <input
              onChange={changeOption}
              className="ring-1 ring-green-400 p-2 rounded-sm"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
            />

            <div
              className="bg-gray-500 p-2 text-white rounded-sm hover:bg-gray-700 duration-100 cursor-pointer"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            {options.map((item) => (
              <div
                className="ring-1 p-2 ring-green-500 rounded-md cursor-pointer flex gap-2"
                key={item.title}
                onClick={() =>
                  setOptions(
                    options.filter((option) => option.title !== item.title),
                  )
                }
              >
                <span>{item.title}</span>
                <span>€{item.additionalPrice}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center hover:bg-green-700 duration-100 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;
