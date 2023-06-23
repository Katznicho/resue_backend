import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import Nav1 from '@/Components/Navs/Nav1';

export default function Home(props) {
  return (
    <GuestLayout>
      <Head title="Home" />
        <Nav1/>

      <Link href={route('login')}>
              <button type="button" className="btn btn-dark ml-4">Log in</button>
            </Link>

            <Link href={route('register')}>
              <button type="button" className="btn btn-dark ml-4">Register</button>
            </Link>
    </GuestLayout>
  );
}
