CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "userName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "hashPassword" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

select * from users
-----------


CREATE TABLE IF NOT EXISTS public.posts
(
    post_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    create_date integer NOT NULL DEFAULT 0,
    message character varying COLLATE pg_catalog."default" NOT NULL,
    "Media_url_massage" character varying COLLATE pg_catalog."default",
    CONSTRAINT posts_pkey PRIMARY KEY (post_id),
    CONSTRAINT post_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;
