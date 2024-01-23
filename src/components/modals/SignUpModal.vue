<template>
    <div>
        <div class="modale__container">
            <div class="modale__content">
            <h2>Sign Up</h2>
            <form @submit.prevent="login">
                <div>
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" />
                </div>
                <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" />
                </div>
                <div>
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" v-model="firstName" />
                </div>
                <div>
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" v-model="lastName" />
                </div>
                <div>
                <label for="age">Age</label>
                <input type="number" id="age" v-model="age" />
                </div>
                <div>
                <label for="address">Address</label>
                <input type="text" id="address" v-model="address" />
                </div>
                <div>
                <input type="submit" value="Sign Up" />
                </div>
            </form>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignUpModal",
    data() {
      return {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        age: "",
        address: "",
      };
    },
    methods: {
      async login() {
        const { username, password, firstName, lastName, age, address } = this;
        const res = await fetch("[^1^][6]", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, firstName, lastName, age, address }),
        });
        const data = await res.json();
        console.log(data);
      },
    },
  };
  </script>

    <style>
        .modale__container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .modale__content {
            width: 500px;
            height: 500px;
            background-color: white;
            border-radius: 10px;
            padding: 20px;
        }

        .modale__content > * {
            margin: 10px 0;
        }

        .modale__content > * > label {
            display: inline-block;
            width: 100px;
        }

        .modale__content > * > input {
            width: 300px;
        }

        .modale__content > * > input[type="submit"] {
            width: 100px;
            height: 30px;
            background-color: #1e90ff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .modale__content > * > input[type="submit"]:hover {
            background-color: #1e90ff;
            color: white;
        }

        .modale__content > * > input[type="submit"]:active {
            background-color: #1e90ff;
            color: white;
        }

        .modale__content > * > input[type="submit"]:focus {
            background-color: #1e90ff;
            color: white;
        }

        .modale__content > * > input[type="submit"]:disabled {
            background-color: #1e90ff;
            color: white;
        }
    </style>
  