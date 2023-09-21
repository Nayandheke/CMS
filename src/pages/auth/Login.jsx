import { Col, Form, Row } from "react-bootstrap";
import { FormItem, SubmitBtn } from "../../components";
import { useState } from "react";
import { inStorage, setInForm } from "../../lib";
import http from "../../http";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
  const [form, setForm] = useState({});
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);

    http.post("login", form)
      .then(({ data }) => {
        if (data.user.type != "Customer") {
          console.log(data.user);
          dispatch(setUser(data.user));
          inStorage("130cmstoken", data.token, remember);
          navigate("/");
        } else {
          toast.error("Access Denied");
        }
      })
      .catch((err) => { })
      .finally(() => setLoading(false));
  };

  return (
    <Col xl={4} className="bg-white mx-auto my-3 py-3 rounded-2 shadow">
      <Row>
        <Col className="text-center">
          <h1>Login</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <FormItem title="Email" label="email">
              <Form.Control
                type="email"
                name="email"
                id="email"
                required
                onChange={(ev) => setInForm(ev, form, setForm)}
              />
            </FormItem>

            <FormItem title="password" label="passowrd">
              <Form.Control
                type="password"
                name="password"
                id="password"
                required
                onChange={(ev) => setInForm(ev, form, setForm)}
              />
            </FormItem>

            <div className="mb-3 form-check">
              <Form.Check.Input
                name="remember"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <Form.Check.Label htmlFor="remember">
                Remember Me
              </Form.Check.Label>
            </div>

            <div className="mb-3 d-grid">
              <SubmitBtn
                label="Log in"
                icon="fa-right-to-bracket"
                loading={loading}
              />
            </div>
          </Form>
        </Col>
      </Row>
    </Col>
  );
};