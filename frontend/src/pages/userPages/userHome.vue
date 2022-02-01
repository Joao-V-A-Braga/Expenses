<template>
  <div class="userHome">
    <div class="bills" v-for="(bill, index) in billsList" :key="bill+index">
      <Bills @getPaid="getPaid" :index="index" :bill="bill"/>
    </div>
  </div>
</template>

<script>
import Bills from "@/utils/userUtils/Bills.vue"
export default {
  data: () => ({
    user: {},
    billsList: [],
  }),
  components:{
    Bills
  },
  methods:{
    getPaid(obj){
      this.billsList[obj.index].paid = obj.paid
      console.log(obj.index +': '+ this.billsList[obj.index].paid)
    }
  },
  mounted: function () {
    this.billsList = [
      {
        billName: "Aluguel",
        value: 1345.23,
        date: new Date(),
        paid: true,
      },
      {
        billName: "Água",
        value: 54.53,
        date: new Date(),
        paid: false,
      },
      {
        billName: "Ádssadaffasafsdafsgua",
        value: 54.53,
        date: new Date(),
        paid: false,
      },
    ];

    this.user = this.$route.params.user;

    this.$emit("State", {
      title: `Olá ${this.user.name}!`,
      ifUser: true,
    });
  },
};
</script>

<style>
.userHome {
  width: 100%;
}
</style>