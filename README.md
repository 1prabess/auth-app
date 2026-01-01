## 🔐 Authentication Flow

This application uses **JWT-based authentication** with **Access Tokens** and **Refresh Tokens**, both stored securely in **HTTP-only cookies**.

---

### 🧾 Token Generation

On login, the server issues:

- **Access Token** – short-lived (15 minutes)
- **Refresh Token** – long-lived (30 days)

Both tokens are sent to the client as **secure, HTTP-only cookies**.

---

### 🔄 Request Authentication

- The **Access Token** is automatically included with every protected request to authenticate the user.
- The **Refresh Token** is only sent to the `/refresh` endpoint.

---

### ♻️ Token Refresh Mechanism

If a request fails due to an expired or invalid Access Token (`401 InvalidAccessToken`):

1. The frontend automatically calls the `/refresh` endpoint where the refresh token is used to generate new access token.
2. If the refresh is successful (`200 OK`), a new Access Token is issued.
3. The original request is retried transparently, keeping the user logged in.

---

### 🚪 Logout on Failure

If the `/refresh` endpoint fails (e.g. refresh token expired or invalid):

- The user is logged out
- Local client state is cleared
- The user is redirected to the login page

---

This approach ensures **strong security**, **session continuity**, and a **smooth user experience** without requiring users to manually re-authenticate.
