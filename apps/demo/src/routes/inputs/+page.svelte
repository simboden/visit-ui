<script lang="ts">
	import {
		Card,
		Code,
		FC,
		FieldColor,
		FieldEmail,
		FieldFirstName,
		FieldLastName,
		FieldName,
		FieldNumber,
		FieldPassword,
		FieldPasswordConfirm,
		FieldPasswordValidated,
		FieldSearch,
		FieldText,
		FieldUsername,
		FR,
		FS,
		H2,
		Icon,
		Input,
		Link,
		Page,
		Radio
	} from 'visit-ui';
	import { mdiMagnify } from '@mdi/js';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const viewOptions = ['preview', 'code'];

	// Input
	let inputView = $state<string | number | null>('preview');
	let text = $state('');
	let withError = $state('wrong value');
	let disabledValue = $state('disabled');
	let password = $state('');
	let search = $state('');

	// FieldText
	let fieldTextView = $state<string | number | null>('preview');
	let textValue = $state('');
	let textValid = $state(false);
	let textError = $state('');

	// FieldEmail
	let fieldEmailView = $state<string | number | null>('preview');
	let emailValue = $state('');
	let emailValid = $state(false);
	let emailError = $state('');

	// FieldPassword
	let fieldPasswordView = $state<string | number | null>('preview');
	let fieldPasswordValue = $state('');
	let fieldPasswordValid = $state(false);
	let fieldPasswordError = $state('');

	// FieldNumber
	let fieldNumberView = $state<string | number | null>('preview');
	let numberValue = $state(0);
	let numberValid = $state(false);
	let numberError = $state('');

	// FieldSearch
	let fieldSearchView = $state<string | number | null>('preview');
	let searchValue = $state('');

	// FieldUsername
	let fieldUsernameView = $state<string | number | null>('preview');
	let usernameValue = $state('');
	let usernameValid = $state(false);
	let usernameError = $state('');

	// FieldName / FieldFirstName / FieldLastName
	let nameValue = $state('');
	let nameValid = $state(false);
	let firstNameValue = $state('');
	let firstNameValid = $state(false);
	let lastNameValue = $state('');
	let lastNameValid = $state(false);

	// FieldPasswordValidated
	let fieldPswValidView = $state<string | number | null>('preview');
	let pswValidValue = $state('');
	let pswValidValid = $state(false);

	// FieldPasswordConfirm
	let fieldPswConfirmView = $state<string | number | null>('preview');
	let pswConfirmValue = $state('');
	let pswConfirmValid = $state(false);

	// FieldColor
	let fieldColorView = $state<string | number | null>('preview');
	let fieldColorValue = $state('#22c55eff');

	const statusClass = 'text-sm';
</script>

<Page title="Inputs">
	<FC class="gap-8">

        <!----- INPUT ----------------->

		<Card>
			<FS>
				<H2>Input</H2>
				<Radio options={viewOptions} bind:value={inputView} class="mr-4" />
			</FS>
			<p>parameters:</p>
			<ul>
				<li><Code>value</Code>: bindable, the input's value.</li>
				<li>
					<Code>label</Code>: optional label shown above the input. Accepts a literal string, or a
					<Code>"#text_id"</Code> to resolve a translation (see <Link href="/language">Language</Link>).
				</li>
				<li><Code>error</Code>: optional error message shown below the input.</li>
				<li><Code>placeholder</Code>: optional placeholder text.</li>
				<li><Code>disabled</Code>: disables the input.</li>
				<li><Code>right</Code>: optional snippet rendered on the right side, e.g. an icon.</li>
			</ul>
			{#if inputView === 'preview'}
				<FR class="flex-wrap items-start gap-4">
					<Input label="Default" placeholder="Type something..." bind:value={text} class="w-64" />
					<Input label="With error" bind:value={withError} error="Invalid value" class="w-64" />
					<Input label="Disabled" bind:value={disabledValue} disabled class="w-64" />
					<Input label="With icon" placeholder="Search..." bind:value={search} class="w-64">
						{#snippet right()}
							<div class="pr-2">
								<Icon icon={mdiMagnify} />
							</div>
						{/snippet}
					</Input>
				</FR>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { Input, Icon } from 'visit-ui';
  import { mdiMagnify } from '@mdi/js';

  let text = $state('');
  let withError = $state('wrong value');
  let disabledValue = $state('disabled');
  let password = $state('');
  let search = $state('');
</` + `script>

<Input label="Default"      placeholder="Type something..." bind:value={text} />
<Input label="With error"   bind:value={withError} error="Invalid value" />
<Input label="Disabled"     bind:value={disabledValue} disabled />
<Input label="With icon" placeholder="Search..." bind:value={search}>
  {#snippet right()}
    <Icon icon={mdiMagnify} />
  {/snippet}
</Input>`}
				/>
			{/if}
		</Card>

        <!----- FIELD TEXT ----------------->

		<Card>
			<FS>
				<H2>FieldText</H2>
				<Radio options={viewOptions} bind:value={fieldTextView} class="mr-4" />
			</FS>
			<p>
				A <Code>Input</Code> with built-in validation: <Code>required</Code>, <Code>minLength</Code>,
				<Code>maxLength</Code> and <Code>pattern</Code>, each with a customizable message.
				Exposes bindable <Code>valid</Code> and <Code>error</Code>.
			</p>
			{#if fieldTextView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldText
						label="First and Last Name"
						placeholder="e.g.: John Doe"
						required
						minLength={3}
						maxLength={64}
						pattern={/^[A-Za-zÀ-ÿ\s]+$/}
						patternMessage="Use only letters or spaces"
						bind:value={textValue}
						bind:valid={textValid}
						bind:error={textError}
					/>
					<p class={statusClass}>valid: {textValid} error: "{textError}"</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldText } from 'visit-ui';

  let value = $state('');
  let valid = $state(false);
  let error = $state('');
</` + `script>

<FieldText
  label="First and Last Name"
  placeholder="e.g.: John Doe"
  required
  minLength={3}
  maxLength={64}
  pattern={/^[A-Za-zÀ-ÿ\\s]+$/}
  patternMessage="Use only letters or spaces"
  bind:value
  bind:valid
  bind:error
/>`}
				/>
			{/if}
		</Card>

        <!----- FIELD EMAIL ----------------->

		<Card>
			<FS>
				<H2>FieldEmail</H2>
				<Radio options={viewOptions} bind:value={fieldEmailView} class="mr-4" />
			</FS>
			<p>
				A <Code>FieldText</Code> preconfigured for email addresses, with format validation and a
				bindable <Code>valid</Code>/<Code>error</Code>.
			</p>
			{#if fieldEmailView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldEmail bind:value={emailValue} bind:valid={emailValid} bind:error={emailError} />
					<p class={statusClass}>valid: {emailValid} error: "{emailError}"</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldEmail } from 'visit-ui';

  let value = $state('');
  let valid = $state(false);
  let error = $state('');
</` + `script>

<FieldEmail bind:value bind:valid bind:error />`}
				/>
			{/if}
		</Card>

        <!----- FIELD PASSWORD ----------------->

		<Card>
			<FS>
				<H2>FieldPassword</H2>
				<Radio options={viewOptions} bind:value={fieldPasswordView} class="mr-4" />
			</FS>
			<p>
				A password input with a show/hide toggle, <Code>minLength</Code> validation, and a
				bindable <Code>valid</Code>/<Code>error</Code>.
			</p>
			{#if fieldPasswordView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldPassword
						minLength={8}
						bind:value={fieldPasswordValue}
						bind:valid={fieldPasswordValid}
						bind:error={fieldPasswordError}
					/>
					<p class={statusClass}>valid: {fieldPasswordValid} error: "{fieldPasswordError}"</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldPassword } from 'visit-ui';

  let value = $state('');
  let valid = $state(false);
  let error = $state('');
</` + `script>

<FieldPassword minLength={8} bind:value bind:valid bind:error />`}
				/>
			{/if}
		</Card>

        <!----- FIELD NUMBER ----------------->

		<Card>
			<FS>
				<H2>FieldNumber</H2>
				<Radio options={viewOptions} bind:value={fieldNumberView} class="mr-4" />
			</FS>
			<p>
				A numeric <Code>Input</Code> with <Code>min</Code>/<Code>max</Code>/<Code>step</Code> range
				validation and a bindable <Code>valid</Code>/<Code>error</Code>. The value can also be
				changed using the keyboard up/down arrow keys or the mouse wheel, in steps of <Code
				>step</Code>.
			</p>
			{#if fieldNumberView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldNumber
						label="Quantity"
						min={0}
						max={10}
						step={1}
						bind:value={numberValue}
						bind:valid={numberValid}
						bind:error={numberError}
					/>
					<p class={statusClass}>valid: {numberValid} error: "{numberError}"</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldNumber } from 'visit-ui';

  let value = $state(0);
  let valid = $state(false);
  let error = $state('');
</` + `script>

<FieldNumber label="Quantity" min={0} max={10} step={1} bind:value bind:valid bind:error />`}
				/>
			{/if}
		</Card>

        <!----- FIELD SEARCH ----------------->

		<Card>
			<FS>
				<H2>FieldSearch</H2>
				<Radio options={viewOptions} bind:value={fieldSearchView} class="mr-4" />
			</FS>
			<p>
				A search input with a magnify icon on the left. Fires <Code>onsearch(value)</Code> when the
				user presses Enter.
			</p>
			{#if fieldSearchView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldSearch
						bind:value={searchValue}
						onsearch={(v) => alert(`search: "${v}"`)}
						class="w-full"
					/>
					<p class={statusClass}>value: "{searchValue}"</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldSearch } from 'visit-ui';
  let value = $state('');
</` + `script>

<FieldSearch bind:value onsearch={(v) => console.log(v)} />`}
				/>
			{/if}
		</Card>

        <!----- FIELD USERNAME ----------------->

		<Card>
			<FS>
				<H2>FieldUsername</H2>
				<Radio options={viewOptions} bind:value={fieldUsernameView} class="mr-4" />
			</FS>
			<p>
				A username input with validation: 3–32 characters, letters / digits / underscore only.
				Exposes bindable <Code>valid</Code> and <Code>error</Code>.
			</p>
			{#if fieldUsernameView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldUsername
						bind:value={usernameValue}
						bind:valid={usernameValid}
						bind:error={usernameError}
					/>
					<p class={statusClass}>valid: {usernameValid} error: "{usernameError}"</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldUsername } from 'visit-ui';
  let value = $state('');
  let valid = $state(false);
  let error = $state('');
</` + `script>

<FieldUsername bind:value bind:valid bind:error />`}
				/>
			{/if}
		</Card>

        <!----- FIELD NAME / FIRST NAME / LAST NAME ----------------->

		<Card>
			<H2>FieldName, FieldFirstName, FieldLastName</H2>
			<p>
				Thin <Code>FieldText</Code> presets, each just a different
				<Code>minLength</Code>/<Code>maxLength</Code>/<Code>pattern</Code> combination:
			</p>
			<ul class="list-disc pl-6 space-y-1">
				<li><Code>FieldName</Code>: 3–64 characters, letters and spaces only (accented letters included).</li>
				<li><Code>FieldFirstName</Code> / <Code>FieldLastName</Code>: 2–64 characters, letters, digits, spaces, apostrophe or hyphen.</li>
			</ul>
			<FR class="flex-wrap items-start gap-4">
				<div class="w-64"><FieldName bind:value={nameValue} bind:valid={nameValid} /></div>
				<div class="w-64"><FieldFirstName bind:value={firstNameValue} bind:valid={firstNameValid} /></div>
				<div class="w-64"><FieldLastName bind:value={lastNameValue} bind:valid={lastNameValid} /></div>
			</FR>
		</Card>

        <!----- FIELD PASSWORD VALIDATED ----------------->

		<Card>
			<FS>
				<H2>FieldPasswordValidated</H2>
				<Radio options={viewOptions} bind:value={fieldPswValidView} class="mr-4" />
			</FS>
			<p>
				A strong-password variant of <Code>FieldPassword</Code>. Validates length (default 8–32) and
				a complexity pattern (uppercase, lowercase, digit, special character). All constraints are
				overrideable via props.
			</p>
			{#if fieldPswValidView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldPasswordValidated bind:value={pswValidValue} bind:valid={pswValidValid} />
					<p class={statusClass}>valid: {pswValidValid}</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldPasswordValidated } from 'visit-ui';
  let value = $state('');
  let valid = $state(false);
</` + `script>

<FieldPasswordValidated bind:value bind:valid />`}
				/>
			{/if}
		</Card>

        <!----- FIELD PASSWORD CONFIRM ----------------->

		<Card>
			<FS>
				<H2>FieldPasswordConfirm</H2>
				<Radio options={viewOptions} bind:value={fieldPswConfirmView} class="mr-4" />
			</FS>
			<p>
				A password confirmation field that validates against another password field. Pass
				<Code>otherPsw</Code> and <Code>otherPswValid</Code> from the primary
				<Code>FieldPasswordValidated</Code>. Re-validates reactively whenever either changes.
			</p>
			{#if fieldPswConfirmView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldPasswordValidated
						label="New Password"
						bind:value={pswValidValue}
						bind:valid={pswValidValid}
					/>
					<FieldPasswordConfirm
						bind:value={pswConfirmValue}
						bind:valid={pswConfirmValid}
						otherPsw={pswValidValue}
						otherPswValid={pswValidValid}
					/>
					<p class={statusClass}>confirm valid: {pswConfirmValid}</p>
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldPasswordValidated, FieldPasswordConfirm } from 'visit-ui';
  let psw = $state('');
  let pswValid = $state(false);
  let confirm = $state('');
  let confirmValid = $state(false);
</` + `script>

<FieldPasswordValidated bind:value={psw} bind:valid={pswValid} />
<FieldPasswordConfirm
  bind:value={confirm}
  bind:valid={confirmValid}
  otherPsw={psw}
  otherPswValid={pswValid}
/>`}
				/>
			{/if}
		</Card>

        <!----- FIELD COLOR ----------------->

		<Card>
			<FS>
				<H2>FieldColor</H2>
				<Radio options={viewOptions} bind:value={fieldColorView} class="mr-4" />
			</FS>
			<p>
				An <Code>Input</Code> with a color swatch button that opens a <Code>ColorEditor</Code> to
				pick the value.
			</p>
			{#if fieldColorView === 'preview'}
				<FC class="max-w-sm gap-2">
					<FieldColor label="Color" bind:value={fieldColorValue} />
				</FC>
			{:else}
				<CodeBlock
code={`<script lang="ts">
  import { FieldColor } from 'visit-ui';

  let value = $state('#22c55eff');
</` + `script>

<FieldColor label="Color" bind:value />`}
				/>
			{/if}
		</Card>
	</FC>
</Page>
