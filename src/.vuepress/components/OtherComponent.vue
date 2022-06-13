<template>
  <table class="table">
    <thead style=" background-color: #C52012;color: white;">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Elemento</th>
        <th scope="col">Enabled</th>
        <th scope="col">Visible</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in tabla" :key="index">
        <th scope="row">{{index+1}}</th>
        <td>{{item.elemento}}</td>
        <td>{{item.enable}}</td>
        <td>{{item.visible}}</td>
      </tr> 
    </tbody>
  </table>
</template>
<script>
export default {
data() {
  return {
   tabla:[
    {elemento:"text",enable:"No soportado",visible:"Soportado"},
    {elemento:"field",enable:"Soportado",visible:"Soportado"},
    {elemento:"check-box",enable:"Soportado",visible:"Soportado"},
    {elemento:"value-list",enable:"Soportado",visible:"Soportado"},
    {elemento:"dynamic-value-list",enable:"Soportado",visible:"Soportado"},
    {elemento:"dependency ",enable:"Soportado",visible:"Soportado"},
    {elemento:"grid",enable:"No soportado ",visible:"Soportado"},
    {elemento:"field-column ",enable:"Soportado",visible:"Soportado"},
    {elemento:"check-box-column",enable:"Soportado",visible:"Soportado"},
    {elemento:"value-list-column",enable:"Soportado",visible:"Soportado"},
    {elemento:"dynamic-value-list-column",enable:"Soportado",visible:"Soportado"},
    {elemento:"image-column",enable:"No soportado",visible:"Soportado"},
    {elemento:"prompt-column",enable:"Soportado",visible:"Soportado"},
    {elemento:"operation",enable:"Soportado",visible:"Soportado"},
    {elemento:"popup-operation",enable:"Soportado",visible:"Soportado"},
    {elemento:"category",enable:"No soportado",visible:"Soportado"},
    {elemento:"sub-category",enable:"No soportado",visible:"Soportado"},
   ] 
  }}
}
</script>
