import classnames from "classnames";
import { ChangeEventHandler, FC, useEffect, useState } from "react";
import slugify from "slugify";

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
}

interface Props {
  initialValue?: SeoResult;
  title?: string;
  onChange(result: SeoResult): void;
}

const commonInput =
  "bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark  dark:border-primary focus:dark:border-primary text-primary-dark p-2 rounded w-full";

const SEOForm: FC<Props> = ({
  title = "",
  onChange,
  initialValue,
}): JSX.Element => {
  const [values, setValues] = useState({
    meta: "",
    slug: "",
    tags: "",
  });

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === "meta") value = value.substring(0, 150);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  const { meta, slug, tags } = values;

  useEffect(() => {
    const slug = slugify(title?.toLowerCase(), {
      strict: true,
    });
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue) {
      setValues({
        ...initialValue,
        slug: slugify(initialValue.slug, {
          strict: true,
        }),
      });
    }
  }, [initialValue]);

  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-primary-dark dark:text-primary text-xl">
        SEO Section
      </h1>
      <Input
        value={slug}
        onChange={handleChange}
        name="slug"
        placeholder="slug-goes-here"
        label="Slug:"
      />
      <Input
        value={tags}
        onChange={handleChange}
        name="tags"
        placeholder="React, Next JS"
        label="Tags:"
      />
      <div className="relative">
        <textarea
          name="meta"
          value={meta}
          onChange={handleChange}
          className={classnames(commonInput, "text-lg h-20 resize-none")}
          placeholder="Meta description"
        />
        <p className="absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm">
          {meta.length}/150
        </p>
      </div>
    </div>
  );
};

const Input: FC<{
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, label, placeholder, value, onChange }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 -translate-y-1/2 font-semibold text-sm text-primary-dark dark:text-primary pl-2">
        {label}
      </span>
      <input
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type="text"
        className={classnames(commonInput, "italic pl-10")}
      />
    </label>
  );
};
export default SEOForm;
