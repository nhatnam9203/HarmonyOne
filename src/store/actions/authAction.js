export function loginMID(merchantCode) {
  return {
    type: 'LOGIN_MID',
    method: 'POST',
    route: `merchant/login/${merchantCode}`,
    body: { merchantCode },
  };
}

export function loginPincode(body) {
  return {
    type: 'LOGIN_PINCODE',
    method: 'POST',
    route: `staff/login`,
    body,
  };
}

export function logout(body, token) {
  return {
    type: 'LOGOUT',
    method: 'PUT',
    route: `staff/logout`,
    body,
    token,
  };
}
