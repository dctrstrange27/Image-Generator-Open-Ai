"use client";
import React, { useEffect, useState } from "react";
import Image from "../../../node_modules/next/image";
import Link from "../../../node_modules/next/link";
import { CgSpinnerAlt } from "react-icons/cg";
import { getRandomPrompt } from "../utils/index";
import axios from "../../../node_modules/axios/index";
const CreatePost = () => {
  interface formTypes {
    name: string;
    prompt: string;
    photo: string;
  }
  const [form, setForm] = useState<formTypes>({
    name: "",
    prompt: "",
    photo: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [errorVisible, setErroVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setErroVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInfoVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [infoVisible]);

  const generateImage = async (e: any) => {
    console.log("hello");
    e.preventDefault();
    if (form.prompt) {
      try {
        setIsGenerating(true);
        const res = await fetch("api/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `${form.prompt}`,
          }),
        });
        const data = await res.json();
        if (data.error.message) {
          setError("Error: Issue found on open AI api!");
          setErroVisible(true);
          setInfoVisible(true)
        } else {
          console.log(data);
        }

        setForm({ ...form, photo: data.url });
      } catch (error) {
        alert(error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleRandomPrompt = (e: any) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, prompt: getRandomPrompt(form.prompt) }));
  };
  return (
    <div className="h-fit border-[1px auto-cols-auto project-page
                    font-inter border-[1px lg:m-auto py-5 text-start lg:w-[80%] xl:w-[70%]">
      <div className="flex flex-col gap-2 border-[1px">
      {errorVisible && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    {infoVisible && (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            Unfortunately the free credit of this app already expired!!
          </span>
        </div>
      )}
      </div>
  
      <div className="px-5 py-16 border-[1px">
        <h1 className=" text-start font-bold text-3xl ">Create</h1>
        <p className="">
          Create imaginative and visually, stunning images through DALL-E AI and
          Share them with the community
        </p>
        <br></br>
        <br></br>
        <br></br>
        <form onSubmit={(e)=> generateImage(e)} className="border-[1px">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleForm}
              placeholder="Johnny"
              required={true}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label"></label>
          </div>
          <br></br>
          <div className="flex items-center space-x-1">
            <p>Prompt:</p>
            <button
              onClick={(e) => handleRandomPrompt(e)}
              className=" p-2 rounded-lg text-sm hover:scale-105 duration-300 ease-in-out btn-primary"
            >
              surprise me
            </button>
          </div>
          <div className="form-control my-2 w-full lg:max-w-xl">
            <input
              type="text"
              name="prompt"
              value={form.prompt}
              onChange={handleForm}
              placeholder="Type here"
              required={true}
              className="input input-bordered w-full lg:max-w-xl"
            />
          </div>
          <div className="border-[1px py-10 lg:px-16 flex justify-center lg:justify-start">
            {form.photo ? (
              <>
                <Image
                  src={form.photo}
                  alt={form.photo}
                  className="w-full h-full object-contain"
                />
              </>
            ) : (
              <>
                <div
                  className={`relative rounded-lg ${
                    isGenerating ? "bg-slate-500" : ""
                  }`}
                >
                  <svg
                    width="333"
                    height="197"
                    viewBox="0 0 333 197"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M322.156 196.873H10.7385C7.8915 196.87 5.16203 195.737 3.14888 193.724C1.13573 191.711 0.00329768 188.982 0 186.135V10.7385C0.00330297 7.89151 1.13573 5.16204 3.14888 3.1489C5.16203 1.13575 7.89151 0.00330032 10.7385 0H322.156C325.003 0.00320788 327.733 1.13562 329.746 3.14879C331.759 5.16196 332.891 7.89149 332.895 10.7385V186.135C332.891 188.982 331.759 191.711 329.746 193.724C327.733 195.737 325.003 196.87 322.156 196.873ZM10.7385 2.38634C8.52415 2.38882 6.40117 3.26957 4.83537 4.83537C3.26957 6.40117 2.38882 8.52415 2.38634 10.7385V186.135C2.38882 188.349 3.26957 190.472 4.83537 192.038C6.40117 193.604 8.52415 194.484 10.7385 194.487H322.156C324.37 194.484 326.493 193.603 328.059 192.038C329.625 190.472 330.506 188.349 330.508 186.135V10.7385C330.506 8.52418 329.625 6.40126 328.059 4.83548C326.493 3.2697 324.37 2.38892 322.156 2.38634H10.7385Z"
                      fill="#F6F6F6"
                    />
                    <path
                      d="M113.401 123.124C137.995 123.124 157.932 103.187 157.932 78.5934C157.932 53.9998 137.995 34.0627 113.401 34.0627C88.8079 34.0627 68.8708 53.9998 68.8708 78.5934C68.8708 103.187 88.8079 123.124 113.401 123.124Z"
                      fill="#E6E6E6"
                    />
                    <path
                      d="M284.997 157.227L232.724 66.6887C232.398 66.1228 231.928 65.6529 231.362 65.3261C230.796 64.9994 230.154 64.8274 229.501 64.8274C228.847 64.8274 228.205 64.9994 227.639 65.3261C227.073 65.6529 226.604 66.1228 226.277 66.6887L194.377 121.941L146.82 39.5706C146.401 38.8451 145.799 38.2426 145.073 37.8237C144.348 37.4048 143.525 37.1843 142.687 37.1843C141.849 37.1843 141.026 37.4048 140.3 37.8237C139.575 38.2426 138.972 38.8451 138.554 39.5706L71.5342 155.652C71.1153 156.377 70.8948 157.2 70.8948 158.038C70.8948 158.876 71.1153 159.699 71.5342 160.424C71.9531 161.15 72.5556 161.752 73.2811 162.171C74.0067 162.59 74.8297 162.811 75.6675 162.811H281.773C282.426 162.811 283.068 162.639 283.634 162.312C284.2 161.985 284.67 161.515 284.996 160.949C285.323 160.383 285.495 159.741 285.495 159.088C285.495 158.435 285.323 157.793 284.997 157.227Z"
                      fill="#3ABFF8"
                    />
                    <path
                      d="M41.7609 21.4771H22.6702V40.5678H41.7609V21.4771Z"
                      fill="#3F3D56"
                    />
                  </svg>
                  {isGenerating && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <CgSpinnerAlt className="animate-spin w-7 text-white h-auto"></CgSpinnerAlt>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <br></br>
          <br></br>
          <button
            className="text-center hover w-full lg:max-w-xl rounded-2xl flex justify-center items-center btn-square btn-primary py-5"
          >
            {isGenerating ? (
              <p className="animate-pulse">Generating...</p>
            ) : (
              "Generate"
            )}
          </button>
          <br></br>
          <p className=" text-[#82868b] text-sm lg:text-base">
            Once you have created the image you want, you can share it with
            others in the community page!
          </p>
          <br></br>
          <button className="text-center hover w-full lg:max-w-xl rounded-2xl flex justify-center items-center btn-square btn-secondary py-5">
            {isGenerating ? (
              <p className="animate-pulse">Sharing...</p>
            ) : (
              "Share with the community"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
