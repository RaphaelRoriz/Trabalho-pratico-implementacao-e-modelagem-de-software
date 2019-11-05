-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ufla_news
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ufla_news
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ufla_news` DEFAULT CHARACTER SET utf8 ;
USE `ufla_news` ;

-- -----------------------------------------------------
-- Table `ufla_news`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ufla_news`.`usuario` (
  `email` VARCHAR(150) NOT NULL,
  `senha` VARCHAR(256) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(150) NULL,
  `id_usuario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `usuariocol_UNIQUE` (`id_usuario` ASC),
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ufla_news`.`publicador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ufla_news`.`publicador` (
  `id_publicado` INT NOT NULL AUTO_INCREMENT,
  `nome_publicador` VARCHAR(150) NOT NULL,
  `avatar_publicador` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id_publicado`),
  UNIQUE INDEX `id_publicado_UNIQUE` (`id_publicado` ASC),
  UNIQUE INDEX `nome_publicador_UNIQUE` (`nome_publicador` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ufla_news`.`boletim`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ufla_news`.`boletim` (
  `id_boletim` INT NOT NULL AUTO_INCREMENT,
  `titulo_boletim` VARCHAR(75) NOT NULL,
  `descricao_boletim` TEXT NOT NULL,
  `capa_boletim` VARCHAR(150) NOT NULL,
  `likes_boletim` INT NOT NULL,
  `data_postagem_boletim` DATETIME NOT NULL,
  `url_boletim` VARCHAR(250) NOT NULL,
  `publicador_id_publicado` INT NOT NULL,
  PRIMARY KEY (`id_boletim`),
  UNIQUE INDEX `id_boletim_UNIQUE` (`id_boletim` ASC),
  UNIQUE INDEX `capa_boletim_UNIQUE` (`capa_boletim` ASC),
  UNIQUE INDEX `url_boletim_UNIQUE` (`url_boletim` ASC),
  INDEX `fk_boletim_publicador_idx` (`publicador_id_publicado` ASC),
  CONSTRAINT `fk_boletim_publicador`
    FOREIGN KEY (`publicador_id_publicado`)
    REFERENCES `ufla_news`.`publicador` (`id_publicado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ufla_news`.`subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ufla_news`.`subscription` (
  `usuario_id_usuario` INT UNSIGNED NOT NULL,
  `publicador_id_publicado` INT NOT NULL,
  PRIMARY KEY (`usuario_id_usuario`, `publicador_id_publicado`),
  INDEX `fk_usuario_has_publicador_publicador1_idx` (`publicador_id_publicado` ASC),
  INDEX `fk_usuario_has_publicador_usuario1_idx` (`usuario_id_usuario` ASC),
  CONSTRAINT `fk_usuario_has_publicador_usuario1`
    FOREIGN KEY (`usuario_id_usuario`)
    REFERENCES `ufla_news`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_publicador_publicador1`
    FOREIGN KEY (`publicador_id_publicado`)
    REFERENCES `ufla_news`.`publicador` (`id_publicado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ufla_news`.`like_publicacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ufla_news`.`like_publicacao` (
  `usuario_id_usuario` INT UNSIGNED NOT NULL,
  `boletim_id_boletim` INT NOT NULL,
  PRIMARY KEY (`usuario_id_usuario`, `boletim_id_boletim`),
  INDEX `fk_usuario_has_boletim_boletim1_idx` (`boletim_id_boletim` ASC),
  INDEX `fk_usuario_has_boletim_usuario1_idx` (`usuario_id_usuario` ASC),
  CONSTRAINT `fk_usuario_has_boletim_usuario1`
    FOREIGN KEY (`usuario_id_usuario`)
    REFERENCES `ufla_news`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_boletim_boletim1`
    FOREIGN KEY (`boletim_id_boletim`)
    REFERENCES `ufla_news`.`boletim` (`id_boletim`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
