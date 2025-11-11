-- Table des posts : stocke toutes les publications des utilisateurs
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY, -- ID unique auto-incrémenté
    auteur_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE, -- Référence à l'utilisateur
    contenu TEXT NOT NULL, -- Texte du post (obligatoire)
    type_post VARCHAR(20) DEFAULT 'simple', -- Type: simple, citation, media
    media_url VARCHAR(500), -- URL pour image/vidéo (optionnel)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Date de création auto
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Date de modification auto
);

-- Table des likes : qui a liké quel post
CREATE TABLE IF NOT EXISTS post_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE, -- Post liké
    user_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE, -- Utilisateur qui like
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (post_id, user_id) -- Empêche de liker plusieurs fois le même post
);

-- Table des commentaires
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE, -- Post commenté
    user_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE, -- Auteur du commentaire
    contenu TEXT NOT NULL, -- Texte du commentaire
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des partages
CREATE TABLE IF NOT EXISTS post_shares (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE, -- Post partagé
    user_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE, -- Utilisateur qui partage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des livres
CREATE TABLE livres (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    auteur_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE,
    description TEXT,
    couverture_url VARCHAR(500),
    genre VARCHAR(100),
    isbn VARCHAR(20),
    statut VARCHAR(50) DEFAULT 'brouillon', -- brouillon, publié, archivé
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des extraits
CREATE TABLE extraits (
    id SERIAL PRIMARY KEY,
    livre_id INTEGER REFERENCES livres (id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    chapitre INTEGER,
    page_debut INTEGER,
    page_fin INTEGER,
    statut VARCHAR(50) DEFAULT 'brouillon',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des favoris (lecteurs)
CREATE TABLE livre_favoris (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE,
    livre_id INTEGER REFERENCES livres (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, livre_id)
);

-- Pour clubs si necessaires

CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    categorie VARCHAR(100),
    ville VARCHAR(100),
    pays VARCHAR(100),
    createur_id INT REFERENCES utilisateur (id) ON DELETE SET NULL,
    regles TEXT,
    site_web TEXT,
    visibilite VARCHAR(20) DEFAULT 'public', -- public, privé
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE club_members (
    id SERIAL PRIMARY KEY,
    club_id INT REFERENCES clubs (id) ON DELETE CASCADE,
    user_id INT REFERENCES utilisateur (id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'membre', -- membre, modérateur, admin
    joined_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE club_posts (
    id SERIAL PRIMARY KEY,
    club_id INT REFERENCES clubs (id) ON DELETE CASCADE,
    auteur_id INT REFERENCES utilisateur (id) ON DELETE SET NULL,
    contenu TEXT NOT NULL,
    media_url TEXT,
    type_post VARCHAR(20) DEFAULT 'simple', -- simple, image, video, document
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ///concernant cIubs si pas hors sujet
-- Table des événements de club
CREATE TABLE club_events (
    id SERIAL PRIMARY KEY,
    club_id INTEGER REFERENCES clubs (id) ON DELETE CASCADE,
    createur_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP,
    type VARCHAR(50) DEFAULT 'rencontre', -- rencontre, webinar, atelier, lecture
    lieu VARCHAR(255),
    max_participants INTEGER,
    lien_visio VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table des participants aux événements
CREATE TABLE club_event_participants (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES club_events (id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (event_id, user_id)
);

-- Table des notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES utilisateur (id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info', -- info, event, post, member
    lien VARCHAR(500),
    lue BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table pour les produits du marketplace
CREATE TABLE IF NOT EXISTS marketplace (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les commandes
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES utilisateur (id),
    product_id INTEGER REFERENCES marketplace (id),
    quantity INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les paiements
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders (id),
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    payment_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_marketplace_status ON marketplace (status);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);