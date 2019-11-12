# runarsf.dev

## Project setup
```node
npm install
```

### Compiles and hot-reloads for development
```node
npm run serve
```

### Compiles and minifies for production
```node
npm run build
```

### Lints and fixes files
```node
npm run lint
```

### Nginx config `sudo vim /etc/nginx/sites-available/default`
```nginx
server {
  listen 80;
  server_name runarsf.dev;

  location / {
    proxy_pass       http://localhost:2227;
    proxy_set_header Host      $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/runarsf.dev/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/runarsf.dev/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
```

### Regenerate certbot certificate
```
sudo certbot --nginx # Select 1 on everything
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
