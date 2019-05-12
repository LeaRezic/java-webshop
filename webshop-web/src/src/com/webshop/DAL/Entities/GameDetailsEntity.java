package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "game_details", schema = "public", catalog = "webshop")
public class GameDetailsEntity implements EntityBase {
    private int gameDetailsId;
    private int productId;
    private Integer playersMin;
    private Integer playersMax;
    private Integer playtimeFrom;
    private Integer playtimeTo;
    private String instructionsVideoUrl;

    @Id
    @Column(name = "game_details_id", nullable = false)
    public int getGameDetailsId() {
        return gameDetailsId;
    }

    public void setGameDetailsId(int gameDetailsId) {
        this.gameDetailsId = gameDetailsId;
    }

    @Basic
    @Column(name = "product_id", nullable = false)
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Basic
    @Column(name = "players_min", nullable = true)
    public Integer getPlayersMin() {
        return playersMin;
    }

    public void setPlayersMin(Integer playersMin) {
        this.playersMin = playersMin;
    }

    @Basic
    @Column(name = "players_max", nullable = true)
    public Integer getPlayersMax() {
        return playersMax;
    }

    public void setPlayersMax(Integer playersMax) {
        this.playersMax = playersMax;
    }

    @Basic
    @Column(name = "playtime_from", nullable = true)
    public Integer getPlaytimeFrom() {
        return playtimeFrom;
    }

    public void setPlaytimeFrom(Integer playtimeFrom) {
        this.playtimeFrom = playtimeFrom;
    }

    @Basic
    @Column(name = "playtime_to", nullable = true)
    public Integer getPlaytimeTo() {
        return playtimeTo;
    }

    public void setPlaytimeTo(Integer playtimeTo) {
        this.playtimeTo = playtimeTo;
    }

    @Basic
    @Column(name = "instructions_video_url", nullable = true, length = -1)
    public String getInstructionsVideoUrl() {
        return instructionsVideoUrl;
    }

    public void setInstructionsVideoUrl(String instructionsVideoUrl) {
        this.instructionsVideoUrl = instructionsVideoUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameDetailsEntity that = (GameDetailsEntity) o;
        return gameDetailsId == that.gameDetailsId &&
                productId == that.productId &&
                Objects.equals(playersMin, that.playersMin) &&
                Objects.equals(playersMax, that.playersMax) &&
                Objects.equals(playtimeFrom, that.playtimeFrom) &&
                Objects.equals(playtimeTo, that.playtimeTo) &&
                Objects.equals(instructionsVideoUrl, that.instructionsVideoUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gameDetailsId, productId, playersMin, playersMax, playtimeFrom, playtimeTo, instructionsVideoUrl);
    }

    @Override
    public int giveId() {
        return gameDetailsId;
    }
}
