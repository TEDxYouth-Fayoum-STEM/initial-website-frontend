<template>
  <div>
    <Marked
      text="Book Your Ticket Now!"
      priority="high"
      class="mb-5 select-none text-center text-2xl"
    />
    <FormData
      :schema="s"
      class="mt-3 grid grid-cols-1 gap-x-6 lg:mt-4 lg:grid-cols-2"
      @submit="submit"
      @error="() => setFieldError(e)"
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
      <div class="mb-4 lg:col-span-2">
        <label class="label">Interests</label>
        <MultiSelect
          v-model="selectedInterests"
          :options="interests"
          :limit="interests.length"
          :searchable="true"
          placeholder="Select your interests (mulitiples are allowed)"
          mode="tags"
        />
      </div>
      <FormControl
        name="email"
        ph="mail@example.com"
        i="solid envelope"
        :schema="s.email"
        :e="e.email"
      />
      <FormControl
        v-model="phone"
        name="wa_nu"
        i="brands whatsapp-square"
        :schema="s.wa_nu"
        :e="e.wa_nu"
        @change="checkPhone"
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
        class="lg:col-span-2"
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
        class="lg:col-span-2"
        :schema="s.question"
        :e="e.question"
      />
      <FormControl
        name="charging_nu"
        desc="The number you transferred from | الرقم الذي حولت منه"
        :schema="s.charging_nu"
        :e="e.charging_nu"
      />
      <FormControl
        v-model="promocode"
        name="promocode"
        :schema="s.promocode"
        :e="e.promocode"
        :success="promocodeMsg"
        @change="checkPromocode"
      />
      <FormControl
        name="receipt_img"
        type="file"
        desc="We Pay: 01551800445 or Vodafone Cash: 01065158294 (You Will Pay 75 L.E.)"
        i="solid receipt"
        class="lg:col-span-2"
        :schema="s.receipt_img"
        :e="e.receipt_img"
      />
      <div class="mb-4 pt-2 lg:col-span-2">
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
import { FireEvent } from "~~/utils/alert";
import { initErrorObject, IFormSchema, setFieldError } from "~~/utils/form";
import { fetcher } from "~~/utils/fetcher";
import governorates from "~~/data/governorates.json";
import interests from "~~/data/interests.json";

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
    "question",
    "charging_nu",
    "promocode",
    "receipt_img"
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
  charging_nu: {
    label: "Charging Number",
    req: true,
  },
  promocode: {
    label: "Promocode",
  },
  receipt_img: {
    label: "Receipt Image",
    req: true,
  },
} as IFormSchema);

const phone = ref("");
const promocode = ref("");
const checkedPromocode = ref(true);
const promocodeMsg = ref("");
const selectedInterests = ref([]);
const agreement = ref(false);

function checkPhone(): void {
  if (promocode.value) checkPromocode();
}
watch(promocode, (value: string) => {
  if (value) {
    checkedPromocode.value = false;
  } else {
    checkedPromocode.value = true;
  }
});

async function checkPromocode(): Promise<void> {
  if (promocode.value) {
    try {
      FireEvent.loading("Loading the Promocode");
      const res = await fetcher("promocodes/check", {
        phone: phone.value,
        promocode: promocode.value,
      });
      checkedPromocode.value = true;
      promocodeMsg.value = `You have got a ${res.data.text}, The ticket price is ${res.data.price} L.E.`;
      FireEvent.close();
    } catch (error) {
      checkedPromocode.value = false;
      if (typeof error === "string") {
        e.promocode.n++;
        e.promocode.msg = error;
        promocodeMsg.value = "";
      }
    }
  }
}

function submit(data: FormData): void {
  if (!checkedPromocode.value) {
    FireEvent.errors(["There is a problem with the promocode!"]);
    return;
  }
  if (!agreement.value) {
    FireEvent.alert({
      icon: "info",
      text: "Please read the instructions and the notice",
      confirmButtonText: "OK",
      confirmButtonColor: "var(--color-primary-300)",
    });
    return;
  }
  if (selectedInterests.value.length > 0)
    data.append("interests", selectedInterests.value.join("|"));
  fetcher("tickets/book", data).then((res) => {
    if (res.data.status) {
      FireEvent.success(
        "The Payment was a Success!",
        "We will notify you when we send the tickets! Wait for our email from <span class='text-primary-300 font-bold'>tickets@tedxfay.org</span>"
      );
    } else {
      FireEvent.defaultError();
    }
  });
}
</script>
