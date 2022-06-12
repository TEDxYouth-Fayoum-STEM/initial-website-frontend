<template>
  <div class="content">
    <FragmentTimer title="FayWHEEL!" />
    <!--div class="box flex justify-center p-5 drop-shadow-md">
      <div class="wheel-container">
        <div class="wheel">
          <div id="wheel-items" class="wheel-items">
            <div v-for="(gift, index) in gifts" :key="index" class="wheel-item">
              <span class="wheel-item-text">{{ gift }}</span>
            </div>
          </div>
          <div class="wheel-arrow">
            <button id="wheel-btn" class="wheel-arrow-btn" @click="handleSpin">
              SPIN!
            </button>
          </div>
        </div>
      </div>
    </div-->
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import { FireEvent } from "~~/utils/alert";
import { fetcher } from "~~/utils/fetcher";
import gifts from "~~/data/gifts.json";

definePageMeta({
  layout: "offers",
  title: "OFFERS",
});

async function validatePhone(phone: string, e: Event): Promise<void> {
  if (!phone.match(/^01([0-2]|5){1}[0-9]{8}$/)) {
    Swal.fire({
      title: "Invalid Phone Number!",
      text: "The entered phone number doesn't match the format 01XXXXXXXXX",
      icon: "error",
      preConfirm: () => {
        handleSpin(e);
      },
    });
    return;
  }
  FireEvent.loading("Spinning the FayWHEEL!");
  const res = await fetcher("promocodes/spin", {
    number: phone,
  });
  if (res.data.error) {
    Swal.fire({
      title: "Invalid Phone Number!",
      text: Array.isArray(res.data.message)
        ? res.data.message[0]
        : res.data.message
        ? res.data.message
        : "The entered phone number is already used",
      icon: "error",
    });
    return;
  }
  const dateStr = new Date(<number>res.data.exp).toLocaleString();
  const index = <number>res.data.spins % gifts.length;
  const gift = gifts[index];
  FireEvent.close();
  // @ts-expect-error NO AVAILABLE TYPES
  const wheel: HTMLDivElement = e.target.offsetParent.offsetParent.children[0];
  // @ts-expect-error NO AVAILABLE TYPES
  const wheelBtn: HTMLButtonElement = e.target;
  wheel.style.transform = `rotate(-${
    <number>res.data.spins * (360 / gifts.length)
  }deg)`;
  wheelBtn.disabled = true;
  setTimeout(() => {
    wheel.style.transform = `rotate(0deg)`;
    wheelBtn.disabled = false;
    Swal.fire({
      title: "Congratulations!",
      html: `
      <p>Your gift is <span class="text-primary-200 font-bold">${gift}</span>.</p>
      <p>It is valid till <span class="text-primary-200 font-bold">${dateStr}</span> to <span class="text-primary-200 font-bold">${phone}</span>.</p>
      <p>Promocode: <span class="text-primary-200 font-bold">${res.data.promocode}</span></p>
      <p>Save This Promocode Until The Tickets Will Open Soon To Receive Your Gift.</p>`,
      icon: "success",
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
    });
  }, 5500);
}

function handleSpin(e: Event): void {
  Swal.fire({
    title: "Enter your phone number to spin the FayWHEEL!",
    input: "text",
    inputLabel: "We only accept Egyptian phone numbers",
    inputPlaceholder: "01XXXXXXXXX",
    preConfirm: (phone: string) => {
      validatePhone(phone, e);
    },
  });
}
</script>
