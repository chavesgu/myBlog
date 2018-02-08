<template>
  <div class="hello">
    http://52.187.146.95/


    <div class="type">
      {{type}}
    </div>

    <pre class="language-js">
		<code>
			let num = 123;
			console.log(num);//123
		</code>
	</pre>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  computed:{
    type(){
      let msg = navigator.userAgent;
      return msg
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
