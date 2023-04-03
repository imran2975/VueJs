<template>
  <form @submit.prevent="handleSubmit">
    <label>Fullname:</label>
    <input type="text" required v-model="name" />
    <label>Email:</label>
    <input type="email" required v-model="email" />
    <label>Create Password:</label>
    <input type="password" required v-model="createPassword" />
    <p v-if="createPassword.length < 8 && createPassword !== ''" class="warn">
      Password must be atleast 8 characters long
    </p>
    <label>Confirm Password:</label>
    <input type="password" required v-model="confirmPassword" />
    <p
      v-if="confirmPassword !== createPassword && confirmPassword !== ''"
      class="warn"
    >
      Password must match
    </p>
    <label>role:</label>
    <select v-model="role">
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
      <option value="devop">DevOp</option>
    </select>
    <label>Skills (seperate with comma to add):</label>
    <input
      type="text"
      v-model="tempSkill"
      @input="addSkillMobile"
      @keyup.alt="addSkillDesktop"
    />
    <div v-for="skill in skills" :key="skill" class="pill">
      <span @click="deleteSkill(skill)">{{ skill }}</span>
    </div>
    <div class="terms">
      <input type="checkbox" required v-model="terms" />
      <label>Accept terms and conditions</label>
    </div>
    <div class="submit">
      <button :disabled="!terms">Create an Account</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      createPassword: "",
      confirmPassword: "",
      role: "developer",
      tempSkill: "",
      skills: [],
      terms: false,
      isMobile: /Mobi/.test(navigator.userAgent),
    };
  },

  methods: {
    // addSkillDesktop(e) {
    //   if (e.key === "," && this.tempSkill) {
    //     if (!this.skills.includes(this.tempSkill)) {
    //       this.skills.push(this.tempSkill);
    //     }
    //     this.tempSkill = "";
    //   }
    // },

    addSkillMobile() {
      if (this.tempSkill && this.tempSkill.includes(",")) {
        const newSkills = this.tempSkill
          .split(",")
          .map((skill) => skill.trim());
        this.skills = [
          ...this.skills,
          ...newSkills.filter(
            (skill) => skill !== "" && !this.skills.includes(skill)
          ),
        ];
        this.tempSkill = "";
      }
    },
    deleteSkill(skill) {
      this.skills = this.skills.filter((item) => {
        return skill !== item;
      });
    },
    handleSubmit() {},
  },
};
</script>

<style scope>
form {
  margin: 30px auto;
  background: #fff;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  max-width: 420px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
  outline: none;
  transition: all 0.5s;
}

input:focus {
  border-bottom: 2px solid #0b6dff;
}

input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: #fff;
  border-radius: 20px;
  transition: all 0.5s;
  cursor: pointer;
}

button[disabled] {
  opacity: 0.3;
  cursor: not-allowed;
}

.submit {
  text-align: center;
}

.warn {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
