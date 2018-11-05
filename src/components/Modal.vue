<template>
  <transition name="vue-modal-fade">
    <div class="modal" @click.self="closeModal">
      <div class="modal__body">
        <div class="modal__close" @click="closeModal">x</div>
        <div class="modal__content"><slot/></div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Modal',
  props: ['isShown'],

  methods: {
    closeModal() {
      this.$emit('update:isShown', false);
    },

    handleEscKeyDown(event) {
      let esc = 27;

      if(event.keyCode == esc) {
        event.stopImmediatePropagation();
        this.closeModal();
      } 
    },
  },

  beforeMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleEscKeyDown);
  },

  beforeDestroy() {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', this.handleEscKeyDown);
  },
}
</script>
<style src="../assets/sass/components/Modal.scss" lang="scss"/>
