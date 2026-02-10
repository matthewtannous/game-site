-- -- Create database
-- CREATE DATABASE game_site
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LOCALE_PROVIDER = 'libc'
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;

-- Create users table
CREATE TABLE public.users
(
    id serial NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    password text NOT NULL,
    created_at date NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    UNIQUE (username)
);

-- Create Trigger to automatically lowercase username on insertion (code from StackOverflow)
CREATE OR REPLACE FUNCTION lowercase_username_on_insert() RETURNS trigger AS $lowercase_username_on_insert$
    BEGIN        
        NEW.username = LOWER(NEW.username);
        RETURN NEW;
    END;
$lowercase_username_on_insert$ LANGUAGE plpgsql;

CREATE TRIGGER lowercase_username_on_insert BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW EXECUTE PROCEDURE lowercase_username_on_insert();


-- Insert data
INSERT INTO public.users (id, username, email, first_name, last_name, password, created_at) VALUES
    (1, 'matthew', 'matthewtan@mail.com', 'Matthew', 'Tannous', 'mat123', '2026-01-16'),
    (2, 'test', 'mail@mail.mail', 'fi', 'la', 'password', '2026-02-4'),
    (3, 'ghost', 'mailtest@hotmail.com', 'John', 'Smith', 'john333', '2026-02-11');



-- Create games table
CREATE TABLE public.games
(
    id smallserial NOT NULL,
    name text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (name)
);

-- Insert data
INSERT INTO public.games (id, name) VALUES
    (1, 'Tic-tac-toe'),
    (2, 'Connect 4');


-- Create challenges table
CREATE TABLE public.challenges
(
    id serial NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    game_type integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    CONSTRAINT "unique_challenge" UNIQUE (sender_id, receiver_id, game_type),
    CONSTRAINT sender FOREIGN KEY (sender_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT receiver FOREIGN KEY (receiver_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT game FOREIGN KEY (game_type)
        REFERENCES public.games (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CHECK (sender_id <> receiver_id)
);

-- NOTE: When inserting a row in challenges, check that there is not a challenge
-- between the receiver and sender

-- Insert data
INSERT INTO public.challenges (id, sender_id, receiver_id, game_type, created_at) VALUES
    (1, 1, 2, 2, '2026-02-11 18:04:59.564489+02'),
    (2, 2, 1, 1, '2026-02-11 18:05:45.818191+02');
