import { useState, useRef } from 'react';

const LockProperty = () => {
  const [amount, setAmount] = useState('');
  const [addresses, setAddresses] = useState<string[]>(['']);
  const [letter, setLetter] = useState('');
  const [condition, setCondition] = useState('');
  const [distributeOption, setDistributeOption] = useState<string | null>(null);
  const [values, setValues] = useState<string[]>(['']);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const previewAmount = amount === '' ? 'NaN' : amount;
  const previewLetter = letter === '' ? 'NaN' : letter;
  const previewCondition = condition === '' ? 'NaN' : condition;

  const handleAddAddress = () => {
    if (addresses.length < 10) {
      setAddresses([...addresses, '']);
      setValues([...values, '']); // Thêm giá trị mặc định cho địa chỉ mới
      if (distributeOption === 'equal') {
        // Cập nhật giá trị cho tất cả các địa chỉ nếu chọn phân phối đều
        const newAmount = parseFloat(amount);
        const valuePerAddress = addresses.length > 0 ? newAmount / addresses.length : 0;
        setValues(Array(addresses.length).fill(valuePerAddress.toFixed(2)));
      }
    }
  };

  const handleRemoveAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleAddressResize = (index: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleAddressChange(index, e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetter(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleDistributeOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDistributeOption(value);
    if (value === 'equal') {
      const newAmount = parseFloat(amount);
      const valuePerAddress = addresses.length > 0 ? newAmount / addresses.length : 0;
      setValues(Array(addresses.length).fill(valuePerAddress.toFixed(2)));
    } else {
      setValues(Array(addresses.length).fill(''));
    }
  };

  return (
    <div className="lock-property">
      <div className="lock-property__form">
        <label className="lock-property__label">Enter the property you want to lock (input: ADA)</label>
        <input
          type="number"
          className="lock-property__input"
          placeholder="0.00000000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label className="lock-property__label">Distribute value</label>
        <select
          className="lock-property__select"
          onChange={handleDistributeOptionChange}
          value={distributeOption || ''}
        >
          <option value="">Select distribution option</option>
          <option value="equal">Distribute equally</option>
          <option value="set">Set individual values</option>
        </select>

        {addresses.map((address, index) => (
          <div key={index} className="lock-property__address-container">
            <div className="lock-property__address-input-container">
              <textarea
                className="lock-property__textarea"
                placeholder={`Enter address ${index + 1}`}
                value={address}
                onChange={(e) => handleAddressResize(index, e)}
                rows={1}
                style={{ resize: 'none' }}
              />
              {index === 0 && addresses.length < 10 && (
                <button className="lock-property__add-button" onClick={handleAddAddress}>+</button>
              )}
              {addresses.length > 1 && (
                <button className="lock-property__remove-button" onClick={() => handleRemoveAddress(index)}>-</button>
              )}
            </div>
            {distributeOption === 'set' && (
              <input
                type="number"
                className="lock-property__input"
                placeholder={`Value for address ${index + 1}`}
                value={values[index]}
                onChange={(e) => handleValueChange(index, e.target.value)}
              />
            )}
          </div>
        ))}

        <label className="lock-property__label">Enter letter</label>
        <textarea
          ref={textareaRef}
          className="lock-property__textarea"
          placeholder="Enter letter"
          value={letter}
          onChange={handleLetterChange}
          rows={1}
        />

        <label className="lock-property__label">Condition</label>
        <select
          className="lock-property__select"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="">Choose condition</option>
          <option value="Condition 1">Condition 1</option>
          <option value="Condition 2">Condition 2</option>
          <option value="Condition 3">Condition 3</option>
          <option value="Condition 4">Condition 4</option>
        </select>
      </div>

      <div className="lock-property__preview">
        <h3 className="lock-property__preview-title">Preview</h3>
        <div className="lock-property__preview-box">
          <p>Amount: {previewAmount} ADA</p>
          {addresses.map((address, index) => (
            <p key={index}>
              Address {index + 1}: {address === '' ? 'NaN' : address}
              {distributeOption === 'set' && values[index] && (
                <span> - Value: {values[index]}</span>
              )}
            </p>
          ))}
          <p>Letter: {previewLetter}</p>
          <p>Condition: {previewCondition}</p>
        </div>
      </div>
    </div>
  );
};

export default LockProperty;
