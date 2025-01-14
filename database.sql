PGDMP     ,    *    	            {            api_blog    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16394    api_blog    DATABASE     |   CREATE DATABASE api_blog WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE api_blog;
                postgres    false            �            1259    16457    posts    TABLE     �   CREATE TABLE public.posts (
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    message character varying NOT NULL,
    media_message character varying,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    16456    posts_post_id_seq    SEQUENCE     �   ALTER TABLE public.posts ALTER COLUMN post_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.posts_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    16449    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    nickname character varying(100) NOT NULL,
    hashpassword character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16448    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215                      0    16457    posts 
   TABLE DATA           V   COPY public.posts (post_id, user_id, message, media_message, create_date) FROM stdin;
    public          postgres    false    217   �       �          0    16449    users 
   TABLE DATA           ;   COPY public.users (id, nickname, hashpassword) FROM stdin;
    public          postgres    false    215   I                  0    0    posts_post_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.posts_post_id_seq', 27, true);
          public          postgres    false    216            	           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    214            n           2606    16464    posts posts_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    217            l           2606    16455    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            o           2606    16465    posts post_user    FK CONSTRAINT     n   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT post_user FOREIGN KEY (user_id) REFERENCES public.users(id);
 9   ALTER TABLE ONLY public.posts DROP CONSTRAINT post_user;
       public          postgres    false    215    3180    217               �  x����n�@��ާ�����3����K�:mP�TI� q���x��1�!JZ7B����ovf��
�մ?].���Uu���b~Ҷ���X���Q�������$^�g&�&IT�2�<�����΋y}<���JT�r�
7X}>�0]_M����B�M2I`��ͺ^L��V.�-��ݗ�o�~���맯߾~�w_o??����7�~eG��C��!�D9k�O'�#&)�A*���Y<k��ИB>IL%���(HQ
h�`�(�L	C9Da$?t� �FQU9 8v֭f�1�k�9
��m�8"D?�"% 9�i�y?[��9���
=]���We��2��� P1ΣU��xjI�<5�sh��TJ��i��Ԭ�]w��z�'8��-ɫ��
v)%@b�.����З��`Bñ3����J��w~ s���|�nUol`W��XOA�������zJDd���z�~WFy�%&r	S5Eܻ9`rW�����1[Lm��d�u��|yU�ظ�R��mz�����Շ�:zޅ|�<�`��|����jހ�D0�N��p���ǽP���Eܞ1������66�&�q�mH.b�^?Xg�]��S���߀Id��~�ɐ��Sb���eg��#���[YvSF݆�=ݿa�$��Zr�2K&�"Kqm!���^t      �   �   x�5�;�0  Й��)E�Q*Z>R0.T!b��j1��N�<�u7*��T��uf76vn���c�0�L|���ix��l�U���go|WW2�v�C�O��?"1ӝYq�<죲r4w�9UCƞ��#�|���d�Yƛ ehx�?6t�9�����|%�AЂ&�� ]R�� E��?�E���6��&�E � �&=�     