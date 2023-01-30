import { Form, useSubmit } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { ValidatedForm } from "remix-validated-form";
import { zfd } from "zod-form-data";
import { withZod } from "@remix-validated-form/with-zod";

export function action() {
  return redirect("/real_page.html");
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>ReloadDocument submit reproduction</h1>
      <p>
        Submitting a normal <code>&lt;Form reloadDocument&gt;</code> works, but
        since <code>ValidatedForm</code> uses <code>useSubmit</code>, this is
        not respected.
      </p>
      <div className="flex gaps">
        <FormExample context="with" reloadDocument />
        <FormExample context="without" />
      </div>
    </div>
  );
}

const validator = withZod(zfd.formData({}));

function FormExample({ context, ...formProps }) {
  const submit = useSubmit();
  const handleSubmit = (event) => submit(event.currentTarget.form);

  return (
    <div className="flex gaps col">
      <ValidatedForm
        validator={validator}
        action="."
        method="post"
        className="flex gaps"
        {...formProps}
      >
        <button type="submit">
          ValidatedForm <strong>{context}</strong> reloadDocument
        </button>
      </ValidatedForm>

      <Form action="." method="post" className="flex col gaps" {...formProps}>
        <div>
          <button type="submit">
            Form <strong>{context}</strong> reloadDocument
          </button>
        </div>

        <div>
          <button type="button" onClick={handleSubmit}>
            Form <strong>{context}</strong> reloadDocument (useSubmit)
          </button>
        </div>
      </Form>
    </div>
  );
}
