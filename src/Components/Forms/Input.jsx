import React from 'react';
import { mask, unMask } from 'remask';

export default function Input(props) {
  const [value, setValue] = React.useState();

  React.useEffect(() => {
    setValue(props.val);
  }, [props]);

  const id = props.id ? props.id : props.name;
  const { errors, register, validator } = props.reference;
  const required = () => validator[props.name]?.required ? <span className="text-danger">*</span> : '';

  function handleChange(event) {
    const valor = props.mask ? mask(unMask(event.target.value), props.mask) : event.target.value;
    setValue(valor);
  }

  return (
    <>
      <div className="form-control">
        <label htmlFor={id}>
          {props.label && (
            <>
              {props.label} {required()}
            </>
          )}
        </label>
        <input
          ref={register(validator[props.name])}
          id={id}
          value={value ? value : ''}
          onChange={handleChange}
          {...props}
        />
        {errors[props.name]?.message && <span className="message-error">{errors[props.name]?.message}</span>}
      </div>
    </>
  );
}