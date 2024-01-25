<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_1804_959)">
    <path d="M7.25 8V16.75C7.25 17.8546 8.14543 18.75 9.25 18.75H14.75C15.8546 18.75 16.75 17.8546 16.75 16.75V8M5.25 8H18.75" stroke="#160042" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M9 5.25H15" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M10.5 11.5V15.25" :stroke="color" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M13.5 11.5V15.25" :stroke="color" stroke-width="1.5" stroke-linecap="round"></path>
    </g>
    <defs>
    <clipPath id="clip0_1804_959">
    <rect width="24" height="24" fill="#160042"></rect>
    </clipPath>
    </defs>
    </svg>
  </template>
  
  <script>
  export default {
    name: 'TrashIcon',
    props: {
    size: {
      type: [String, Number],
      default: '24', 
    },
    color:{
      type: String,
      default : "black"
    }
  },
  };
  </script>
  