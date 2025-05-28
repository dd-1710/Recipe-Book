/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.13 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `users` (
	`id` int (11),
	`user_name` varchar (765),
	`user_password` varchar (765),
	`created_at` datetime 
); 
insert into `users` (`id`, `user_name`, `user_password`, `created_at`) values('1','Chitti','$2b$10$R3HYPU0eTg6fZPHMA01IaOa/YRX8cJhka82SSES.T2ZiEeOMPozUG','2025-05-28 14:38:47');
insert into `users` (`id`, `user_name`, `user_password`, `created_at`) values('2','s','$2b$10$SesArPi6N7yO1Py/tvXwkOXu4lFliqPZM8voNIIk.3P3eHLadnIm.','2025-05-28 15:34:02');
insert into `users` (`id`, `user_name`, `user_password`, `created_at`) values('3','d','$2b$10$ZFs147FCtnFjkn.5NP4rkOPLJfIMrbVTSi65jdDcvY75CHnimzLAS','2025-05-28 15:34:39');
insert into `users` (`id`, `user_name`, `user_password`, `created_at`) values('4','dc','$2b$10$Ypl2o0eWve/bKhgscjpRE.0BdQiIglqlpH34zsSBlXx099GJLU4CS','2025-05-28 15:38:45');
insert into `users` (`id`, `user_name`, `user_password`, `created_at`) values('5','xa','$2b$10$9A0iovXd8bmy.R2z8ki5xegODg2C7ZAq3xskoBtKu35vD34CP9pqO','2025-05-28 15:39:49');
insert into `users` (`id`, `user_name`, `user_password`, `created_at`) values('6','qw','$2b$10$GT4oXhq7Pw2PCqDkq1Y6G..woEhLI1B.gUk9vCw0VCMkjXBTb.At.','2025-05-28 15:40:13');
insert into `users` (`id`, `user_name`, `user_password`, `created_at`) values('7','re','$2b$10$PaLSZx2ul2yMbZbDUuQ28eudngnq99jek6Y.MYDH.ZarSGQdoPVZq','2025-05-28 15:41:43');
insert into `users` (`id`, `user_name`, `user_password`, `created_at`) values('8','a','$2b$10$d2tCXzO9axTClyCMjkRW5OBjUgzlzLC6xgky1M8cAGAsyYLAtCxcK','2025-05-28 15:42:11');
