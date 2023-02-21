import NewsletterSignup from '../components/NewsletterSignup';

function NewsletterPage() {
  return (
      <NewsletterSignup />
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  console.log(email);
  return { message: 'Signup successful!' };
}