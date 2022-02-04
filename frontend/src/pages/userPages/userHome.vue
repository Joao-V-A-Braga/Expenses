<template>
  <div class="userHome">
    <div class="bills">
      <div v-for="(bill, index) in billsList" :key="index">
        <Bills
          :class="index % 2 == 0 ? 'odd' : ''"
          @getPaid="getPaid"
          @getIfDel="getIfDel"
          :index="index"
          :bill="bill"
          :user="user"
        />
      </div>
    </div>
    <CadastreExpenseButton :user="user" />
  </div>
</template>

<script>
import Bills from "@/utils/userUtils/Bills.vue";
import CadastreExpenseButton from "@/utils/userUtils/CadastreExpenseButton.vue";
const axios = require("axios");
export default {
  data: () => ({
    user: {},
    billsList: [],
  }),
  components: {
    Bills,
    CadastreExpenseButton,
  },
  methods: {
    getIfDel(obj){
      this.billsList = this.billsList.filter((item, index) => index !== obj.index)
    },
    getPaid(obj) {
      this.billsList[obj.index].paid = obj.paid;
    },
    getExpanses: async function () {
      const header = {
        headers: {
          Authorization: "bearer " + this.user.token,
          "Content-Type": "application/json",
        },
      };
      await axios
        .get("http://localhost:3000/expenses/" + this.user.id, header)
        .then((res) => {
          this.billsList = [...res.data].sort((a,b) => a.id > b.id ? 1 : -1)
          
        })
        .catch((err) => {
          console.log("O usuário não possui despesas!");
        });
    },
  },
  mounted: function () {
    this.user = this.$route.params.user;
    this.getExpanses();

    this.$emit("State", {
      title: `Olá ${this.user.name}!`,
      ifUser: true,
    });
  },
};
</script>

<style>
.userHome {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding-top: 10px;
}
.bills {
  overflow-y: scroll;
  width: 100%;
}
/* width */
::-webkit-scrollbar {
  display: none;
}
</style>