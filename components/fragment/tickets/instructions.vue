<template>
  <div class="box flex flex-col p-8 drop-shadow-md">
    <Marked
      text="Instructions"
      priority="high"
      class="mb-3 select-none text-2xl"
    />
    <ul role="list" class="flex list-decimal flex-col flex-wrap">
      <li>Fill in the form</li>
      <li>
        Pay the specified amount
        <Marked text="(it may differ according to the promocode)" /> to
        <Marked text="We Pay: 01551800445" /> or
        <Marked text="Vodafone Cash: 01065158294" />
      </li>
      <li>Take a screenshot of the receipt to upload it in the form</li>
      <li>Submit the form</li>
      <li>
        Wait for the announcement of the sending the tickets and check an email
        from <Marked text="tickets@tedxfay.org" priority="med" />
      </li>
    </ul>
    <Marked
      text="Notice"
      priority="high"
      class="mb-3 mt-5 select-none text-2xl"
    />
    <ul role="list" class="flex list-disc flex-col flex-wrap">
      <li>
        We aren't responsible if you lose access to your email address or
        whatsapp account.
      </li>
      <li>
        Keep a copy of the payment data, especially the receipt picture and
        date, to contact us in case of emergency.
      </li>
      <li>
        Any data collected from this site is used directly to enhance your
        experience in our services and provide you with resources related to
        your interests .
      </li>
      <li>We will raise a notice when we are sending the tickets.</li>
      <li>
        Feel free to contact us using:
        <Marked text="contact@tedxfay.org" priority="med" />,
        <Marked text="tedxyouthfayoumstem@gmail.com" />,
        <Marked text="+201551697124" /> or <Marked text="+201065158294" />
      </li>
    </ul>
  </div>
</template>
