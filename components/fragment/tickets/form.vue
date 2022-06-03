<template>
  <div>
    <Marked
      text="Book Your Ticket Now!"
      priority="high"
      class="select-none text-2xl"
    />
    <FormData
      :schema="s"
      class="mt-3 grid grid-cols-1 gap-x-6 lg:mt-4 lg:grid-cols-2"
      @submit="next"
      @error="handleErrors"
    >
      <FormControl name="name" :schema="s.name" :e="e.name" />
      <FormControl
        name="gender"
        ph="Select Your Gender"
        :schema="s.gender"
        :e="e.gender"
        select
      >
        <option value="MALE">MALE</option>
        <option value="FEMALE">FEMALE</option>
      </FormControl>
      <FormControl
        name="role"
        ph="Select Your Role"
        :schema="s.role"
        :e="e.role"
        select
      >
        <option value="STEM_STUDENT">STEM STUDENT</option>
        <option value="STUDENT">STUDENT</option>
        <option value="UNDER_GRADUATE">UNDERGRADUATE</option>
        <option value="GRADUATE">GRADUATE</option>
      </FormControl>
      <FormControl
        name="school_or_uni"
        i="solid school"
        :schema="s.school_or_uni"
        :e="e.school_or_uni"
      />
      <FormControl
        name="email"
        ph="mail@example.com"
        i="solid envelope"
        :schema="s.email"
        :e="e.email"
      />
      <FormControl
        name="wa_nu"
        i="brands whatsapp-square"
        :schema="s.wa_nu"
        :e="e.wa_nu"
      />
      <FormControl
        name="birthdate"
        type="date"
        :schema="s.birthdate"
        :e="e.birthdate"
      />
      <FormControl
        name="profile_img"
        type="file"
        i="solid id-badge"
        :schema="s.profile_img"
        :e="e.profile_img"
      />
      <FormControl
        name="governorate"
        ph="Select The Governorate"
        class="col-span-2"
        :schema="s.governorate"
        :e="e.governorate"
        select
      >
        <option
          v-for="governorate in governorates"
          :key="governorate.id"
          :value="governorate.id"
        >
          {{ governorate.n_en }} - {{ governorate.n_ar }}
        </option>
      </FormControl>
      <FormControl
        name="question"
        class="col-span-2"
        :schema="s.question"
        :e="e.question"
      />
      <div class="mb-4 pt-2">
        <input
          id="ticket-form-agreement"
          v-model="agreement"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-200 focus:ring-2 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
        />
        <label
          for="ticket-form-agreement"
          class="ml-2 select-none font-medium text-gray-900 dark:text-gray-300"
        >
          I have read the <Marked text="Instructions" /> and the
          <Marked text="Notice" />
        </label>
      </div>
      <div class="inline-block"><Btn text="SUBMIT" submit /></div>
    </FormData>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
// import { FireEvent } from '~~/utils/alert';
import { initErrorObject, IFormSchema, setFieldError } from "~~/utils/form";
import governorates from "~~/data/governorates.json";
// import intersetsData from "~~/data/interests.json";

const e = reactive(
  initErrorObject(
    "name",
    "gender",
    "role",
    "school_or_uni",
    "interests",
    "email",
    "wa_nu",
    "birthdate",
    "profile_img",
    "governorate",
    "question"
  )
);
const s = reactive({
  name: {
    label: "Full Name",
    req: true,
  },
  gender: {
    label: "Gender",
    req: true,
  },
  role: {
    label: "Your Role",
    req: true,
  },
  school_or_uni: {
    label: "School Or University",
    req: true,
  },
  interests: { label: "Interests" },
  email: {
    label: "Email Address",
    req: true,
  },
  wa_nu: {
    label: "Whatsapp Number",
    req: true,
  },
  birthdate: { label: "Birthday" },
  profile_img: { label: "Profile Image" },
  governorate: {
    label: "Governorate",
    req: true,
  },
  question: {
    label: "How Did You Hear About Us ?",
    req: true,
  },
} as IFormSchema);

const handleErrors = setFieldError(e);

const agreement = ref(false);

function next(_data: FormData): void {
  if (!agreement.value) {
    Swal.fire({
      icon: "info",
      text: "Please read the instructions and the notice",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--color-primary-300)",
    });
  }
}
</script>
