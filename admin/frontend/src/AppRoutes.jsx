import React from 'react';
import ContactUsList from './pages/ContactUsList';
import Properties from './pages/Properties';
import Blog from './pages/Blog';
import BlogForm from './components/blog/BlogForm';
import FeaturedProducts from './pages/FeaturedProducts';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createBlog, updateBlog } from './api/blog';
import { PropertiesProvider } from './context/PropertiesContext';
import { BlogProvider } from './context/BlogContext';
import { ContactUsProvider } from './context/ContactUsContext';
import { FeaturedProductsProvider } from './context/FeaturedProductsContext';


const AppRoutes = () => (
  <PropertiesProvider>
    <BlogProvider>
      <ContactUsProvider>
        <Routes>
          <Route path="/properties" element={<Properties />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/create-blog" element={<BlogForm onSubmit={async (data) => {
            try {
              await createBlog(data);
              console.log('Blog created successfully');
            } catch (error) {
              console.error('Error creating blog:', error);
            }
          }} onCancel={() => console.log('Cancel')} />} />
          <Route path="/edit-blog/:id" element={<BlogForm initial={{ title: 'Sample Title', content: 'Sample Content' }} onSubmit={async (data) => {
            try {
              const id = 'sample-id'; // Replace with actual ID from route params
              await updateBlog(id, data);
              console.log('Blog updated successfully');
            } catch (error) {
              console.error('Error updating blog:', error);
            }
          }} onCancel={() => console.log('Cancel')} />} />
          <Route path="/contactus" element={<ContactUsList />} />
          <Route path="/featured-products" element={
            <FeaturedProductsProvider>
              <FeaturedProducts />
            </FeaturedProductsProvider>
          } />
          <Route path="*" element={<Navigate to="/properties" />} />
        </Routes>
      </ContactUsProvider>
    </BlogProvider>
  </PropertiesProvider>
);

export default AppRoutes;
