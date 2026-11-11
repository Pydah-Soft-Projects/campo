# Campo Nginx Setup (`campo.co.in`)

This folder contains the production Nginx server block for `campo.co.in` and `www.campo.co.in`, aligned with `FRONTEND_WEB_ROOT=/var/www/campo` in `.github/workflows/deploy.yml`.

## Server Installation Steps

### Amazon Linux (AWS Lightsail `ec2-user`)
```bash
sudo cp nginx/campo.conf /etc/nginx/conf.d/campo.conf
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
```

### Ubuntu / Debian
```bash
sudo cp nginx/campo.conf /etc/nginx/sites-available/campo.conf
sudo ln -sf /etc/nginx/sites-available/campo.conf /etc/nginx/sites-enabled/campo.conf
sudo nginx -t
sudo systemctl reload nginx
```

## Enable HTTPS with Certbot (Let's Encrypt)
Once DNS (`A` records for `campo.co.in` and `www.campo.co.in`) points to your Lightsail IP:
```bash
sudo certbot --nginx -d campo.co.in -d www.campo.co.in
```
Certbot will automatically configure SSL on port `443` and redirect HTTP to HTTPS.

## Future Backend Integration
When you add a backend service later, uncomment the `location /api/` block in `/etc/nginx/conf.d/campo.conf` (or `sites-available/campo.conf`), verify with `sudo nginx -t`, and run `sudo systemctl reload nginx`.

