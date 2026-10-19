# FRAX ART — implementation plan

The active project is now the FRAX ART creative art and design center website based on the supplied HTML concept. The visual direction is image-led editorial design: dark studio photography, warm paper tones, rust accents, serif display type, and spacious sections.

The homepage includes the supplied information architecture—Home, About, Art, Services, Projects, Workshops, Studio, Contact, and Visit—plus a Reviews link. Custom generated visuals are used for the hero, gallery, featured project, and studio story. Gallery cards are filterable and open in an accessible lightbox.

The new `/reviews.html` page supports client name, service, written review, consent, and a 1–5 star rating. It calculates the average rating, rating distribution, review count, and published review cards. For the prototype, records are stored in browser localStorage under `frax-art-reviews-v1`, with a future-ready record shape (`id`, `name`, `service`, `rating`, `review`, `date`, `status`) that can later be moved to a shared backend/database.

All functionality uses HTML, CSS, and vanilla JavaScript. No paid API or third-party runtime is required.
