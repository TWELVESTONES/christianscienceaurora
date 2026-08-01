INSERT INTO redirects (source_path, destination_path, status_code) VALUES
('/about-us','/about',301),
('/calendar-of-events','/events',301),
('/contact-us','/contact',301)
ON CONFLICT (source_path) DO NOTHING;

-- Import public seed records from content/data.ts through the CMS migration script.
-- Do not publish church-confirmation or permissions placeholders in production.
