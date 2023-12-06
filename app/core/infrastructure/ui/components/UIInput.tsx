"use client";
import React, { ReactNode, useState } from "react";
import { Form, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";

export type UIInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  required: boolean;
  pattern?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  msgInvalid?: string;
  overlayMsg?: string | ReactNode;
  overlayLocation?: "top" | "right" | "bottom" | "left";
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  type?: string;
  autoComplete?: "on" | "off" | "new-password";
  labelOnTop?: boolean;
};

export const UIInput: React.FC<UIInputProps> = ({
  label,
  name,
  placeholder,
  value,
  required,
  pattern,
  onChange,
  onFocus,
  type,
  disabled,
  isInvalid,
  msgInvalid,
  autoComplete,
  overlayMsg,
  overlayLocation,
  labelOnTop
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{overlayMsg}</Popover.Body>
    </Popover>
  );

  return (
    <>
    { labelOnTop ? 
      (
        <Row bsPrefix="form-row">
          <Form.Group className="mb-1 w-100">
            {
              label && 
              <Form.Label bsPrefix="label" htmlFor={name} key={"l" + name} className="w-100">
                {label}
              </Form.Label>
            }
            <Form.Control
                className={(isInvalid) ? 'value is-invalid' : 'value w-75'}
                key={"v" + name}
                type={type}
                required={required}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                pattern={pattern}
                onChange={onChange}
                disabled={disabled}
                autoComplete={autoComplete}
              />
            </Form.Group>
            {isInvalid && msgInvalid && (
              <div className="invalid-feedback text-center">{msgInvalid}</div>
            )}
        </Row>
      )
      :
      (
        <Row bsPrefix="form-row">
          {
            label && <Form.Label bsPrefix="label" htmlFor={name} key={"l" + name}>
            {label}
          </Form.Label>
          }
          {overlayMsg ? (
            <OverlayTrigger
              placement={overlayLocation ?? "top"}
              overlay={popover}
              show={showTooltip}
            >
              <Form.Control
                className={(isInvalid) ? 'value is-invalid' : 'value'}
                key={"v" + name}
                type={type}
                required={required}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                pattern={pattern}
                onChange={onChange}
                onFocus={() => {
                  setShowTooltip(true);
                }}
                onBlur={() => {
                  setShowTooltip(false);
                }}
                disabled={disabled}
                autoComplete={autoComplete}
              />
            </OverlayTrigger>
          ) : (
            <Form.Control
              className={(isInvalid) ? 'value is-invalid' : 'value'}
              key={"v" + name}
              type={type}
              required={required}
              id={name}
              name={name}
              placeholder={placeholder}
              value={value}
              pattern={pattern}
              onChange={onChange}
              disabled={disabled}
              autoComplete={autoComplete}
            />
          )}
          {isInvalid && msgInvalid && (
            <div className="invalid-feedback text-center">{msgInvalid}</div>
          )}
        </Row>
      )
    }
    </>
  );
};
