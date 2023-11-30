// src/features/currency/CurrencyConverter.tsx
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { fetchExchangeRate } from "../api/CurrencyAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setExchangeRate } from "../store/slices/CurrencySlice";

interface FormValues {
  amount: number;
}

const CurrencyConverter: React.FC = () => {
  const dispatch = useDispatch();
  const initialValues: FormValues = { amount: 1 };

  const exchangeRate = useSelector(
    (state: RootState) => state.currency.exchangeRate
  );

  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("UZS");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    fetchExchangeRate().then((rates: any) => {
      dispatch(setExchangeRate(rates));
    });
  }, []);

  const handleSubmit = (values: FormValues) => {
    if (!exchangeRate[fromCurrency] || !exchangeRate[toCurrency]) {
      alert("Invalid currency selection.");
      return;
    }

    const amountInBase = values.amount / exchangeRate[fromCurrency];
    const convertedAmount = amountInBase * exchangeRate[toCurrency];
    setResult(formatCurrency(convertedAmount, toCurrency));
  };

  function formatCurrency(
    amount: number,
    currencyCode: string = "USD"
  ): string {
    console.log("amount", amount);
    let [integerPart, decimalPart] = amount.toFixed(2).split(".");
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${currencyCode} ${integerPart}.${decimalPart}`;
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <div className="ec-currency-exchange-wrapper">
        <div className="ec-currency-exchange-inner">
          <div className="ec-card">
            <div className="ec-card-body">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ setFieldValue }) => (
                  <Form>
                    <div className="ec-rates-wrapper">
                      <div className="ec-rates-item">
                        <label htmlFor="fromCurrency">From:</label>
                        <select
                          className="ec-form-select"
                          name="fromCurrency"
                          value={fromCurrency}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setFromCurrency(e.target.value)
                          }
                        >
                          {Object.keys(exchangeRate).map(
                            (currencyCode, idx) => (
                              <option
                                value={currencyCode}
                                key={"from-currency-" + idx}
                              >
                                {currencyCode}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="ec-rates-item">
                        <label htmlFor="toCurrency">To:</label>
                        <select
                          className="ec-form-select"
                          name="toCurrency"
                          value={toCurrency}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setToCurrency(e.target.value)
                          }
                        >
                          {Object.keys(exchangeRate).map(
                            (currencyCode, idx) => (
                              <option
                                value={currencyCode}
                                key={"to-currency-" + idx}
                              >
                                {currencyCode}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    <input
                      className="ec-form-control"
                      name="amount"
                      type="number"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("amount", e.target.value);
                      }}
                    />
                    <div className="ec-footer">
                      <button className="ec-btn-primary" type="submit">
                        Convert
                      </button>
                      <div>
                        Result: <span>{result}</span>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
