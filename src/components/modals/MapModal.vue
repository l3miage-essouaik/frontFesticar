<template>
    <div v-if="showMap" class="modal-bg">
      <div class="modal-content">
        <div class="map-container">
          <l-map ref="map" v-model:zoom="zoom" :center="center">
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-marker :lat-lng="markerCoordinates"></l-marker>
          </l-map>
        </div>
        <button class="close-button" @click="closeModal">×</button>
      </div>
    </div>
  </template>
  
  <script>
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
  
  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    props: {
      showMap: Boolean,
      lng: Number,
      lat: Number
    },
    data() {
      return {
        zoom: 14,
        center: [this.lat, this.lng],
        markerCoordinates: [this.lat, this.lng],
      };
    },
    methods: {
      closeModal() {
        this.$emit('close-map-modal');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    position: relative;
  }
  
  .map-container {
    height: 250px;
    width: 500px;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .close-button:hover {
    color: red;
  }
  
  </style>