<template>
  <form @submit.prevent="submit">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { FireEvent } from "~~/utils/alert";
import { transform } from "~~/utils/form";
import messages from "~~/constants/messages";

const props = defineProps({
  schema: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["submit", "error"]);

async function submit(e: Event): Promise<void> {
  FireEvent.loading("Processing Form Data");
  const formdata = new FormData(<HTMLFormElement>e.target);
  const data: Record<string, unknown> = {};
  for (const datum of formdata.entries()) {
    if (
      props.schema[datum[0]] &&
      (props.schema[datum[0]].type || props.schema[datum[0]].tranform)
    ) {
      data[datum[0]] = transform(
        // The file data is dealt with just like a normal string
        <string>datum[1],
        props.schema[datum[0]].type,
        props.schema[datum[0]].tranform
      );
    } else {
      data[datum[0]] = datum[1];
    }
  }
  for (const datum in props.schema || []) {
    if (
      [undefined, null, ""].includes(<string>data[datum]) &&
      props.schema[datum].req
    ) {
      FireEvent.error(
        "Invalid Data!",
        props.schema[datum].label,
        messages.required
      );
      return emit("error", datum, messages.required);
    }
    if (props.schema[datum].validate) {
      const result = await props.schema[datum].validate(data[datum]);
      if (result) {
        FireEvent.error("Invalid Data!", props.schema[datum].label, result);
        return emit("error", datum, result);
      }
    }
  }
  emit("submit", formdata);
}
</script>
