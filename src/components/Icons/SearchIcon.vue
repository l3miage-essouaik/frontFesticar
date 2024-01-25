<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1804_985)">
            <path d="M14.25 14.25L18.75 18.75" :stroke="color" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            <circle cx="10.5" cy="10.5" r="5.25" :stroke="color" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></circle>
        </g>
        <defs>
            <clipPath id="clip0_1804_985">
                <rect width="24" height="24" fill="#160042"></rect>
            </clipPath>
        </defs>
    </svg>
</template>
  
<script>
export default {
    name: 'searchIcon',
    props: {
    size: {
      type: [String, Number],
      default: '24', //par defaut
    },
    color:{
      type: String,
      default : "black"
    }
  },
};
</script>
  