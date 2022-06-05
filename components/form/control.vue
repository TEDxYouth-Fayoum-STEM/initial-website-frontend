<template>
  <div :class="props.mb">
    <label :for="id" class="form-label"
      >{{ props.schema.label }}
      <Marked v-if="props.schema.req" text=" *" priority="high"
    /></label>
    <div :class="{ relative: props.i || error }">
      <div
        :class="{
          'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3':
            props.i,
        }"
      >
        <Icon v-if="props.i" :i="props.i" size="lg" />
      </div>
      <select
        v-if="props.select"
        :id="id"
        :name="props.name"
        :class="[{ 'form-icon': props.i }, { error: error }]"
        class="form-control pr-12"
        @change="change"
      >
        <option v-if="props.ph" selected disabled>
          {{ props.ph }}
        </option>
        <slot />
      </select>
      <input
        v-else
        :id="id"
        v-input="value"
        :type="props.type"
        :name="props.name"
        :placeholder="props.ph"
        :autocomplete="nocomplete ? 'off' : 'on'"
        :class="[{ 'form-icon': props.i }, { error: error && !select }]"
        class="form-control pr-12"
        @input="input"
        @change="change"
      />
      <div
        v-if="error && !select"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <Icon i="solid x" size="lg" class="text-error" />
      </div>
    </div>
    <p class="ml-1 mt-1 text-red-600 dark:text-red-500">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { transform } from "~~/utils/form";
import messages from "~~/constants/messages";

const value = ref("");
const error = ref("");

const props = defineProps({
  schema: {
    type: Object,
    default: () => ({}),
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  e: {
    type: Object,
    default: () => ({}),
  },
  ph: {
    type: String,
    default: null,
  },
  i: {
    type: String,
    default: null,
  },
  mb: {
    type: String,
    default: "mb-3",
  },
  select: {
    type: Boolean,
    default: false,
  },
  notrim: {
    type: Boolean,
    default: false,
  },
  nocomplete: {
    type: Boolean,
    default: false,
  },
  success: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [File, String],
    default: "",
  },
});

watch(
  () => props.modelValue,
  () => {
    // @ts-expect-error v-input checks if it is a normal input before assigning the value
    value.value = props.modelValue;
  }
);

const id = computed(() => `form-input-${props.name}`);

watch(
  () => props.e.n,
  () => {
    error.value = props.e.msg;
  }
);

const emit = defineEmits(["change", "update:modelValue"]);

function convert(value: string): unknown {
  if (props.schema) {
    return transform(
      // The file data is dealt with just like a normal string
      <string>value,
      props.schema.type,
      props.schema.tranform
    );
  } else {
    return value;
  }
}

function getValue(e: Event, parse = true): unknown {
  const target = <HTMLInputElement>e.target;
  return props.type === "file"
    ? (target.files || [null])[0]
    : parse
    ? convert(target.value)
    : target.value;
}

async function validate(value: unknown, online = true): Promise<boolean> {
  if (props.schema && props.schema.validate) {
    const result = await props.schema.validate(value, online);
    if (result) {
      error.value = result;
      return false;
    }
  }
  return true;
}

async function input(e: Event): Promise<void> {
  if (props.type !== "file") {
    value.value = <string>getValue(e, false);
    const parsedValue = getValue(e);
    emit("update:modelValue", parsedValue);
    await validate(parsedValue, false);
  }
}

async function change(e: Event): Promise<void> {
  const value = getValue(e);
  if (props.select) emit("update:modelValue", value);
  if (props.schema.req && [undefined, null, ""].includes(<string>value)) {
    error.value = messages.required;
    return;
  }
  if (props.schema && props.schema.validate) {
    if (!(await props.schema.validate(value))) return;
  }
  error.value = "";
  emit("change", value);
}
</script>
