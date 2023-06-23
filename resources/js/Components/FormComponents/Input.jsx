const Input = (
  {
    className="",
    required=true,
    value,
    name,
    handleChange,

    defaultValue,
    hidden=false,
    style,
    placeholder,
    disabled
  }) => {



  return (
    <input
      type="text"
      style={style}
      name={name}
      className={"form-control "+className}
      defaultValue={defaultValue}
      value={value}
      required={required}
      onChange={handleChange}
      hidden={hidden}
      placeholder={placeholder}
      disabled={disabled}
      
    />
  );
}

export default Input;
