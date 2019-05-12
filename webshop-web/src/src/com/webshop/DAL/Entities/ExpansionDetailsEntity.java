package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "expansion_details", schema = "public", catalog = "webshop")
public class ExpansionDetailsEntity implements EntityBase {
    private int expansionDetailsId;
    private int productId;
    private int baseGameId;
    private Integer addedPlayersNum;
    private Integer addedPlaytime;

    @Id
    @Column(name = "expansion_details_id", nullable = false)
    public int getExpansionDetailsId() {
        return expansionDetailsId;
    }

    public void setExpansionDetailsId(int expansionDetailsId) {
        this.expansionDetailsId = expansionDetailsId;
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
    @Column(name = "base_game_id", nullable = false)
    public int getBaseGameId() {
        return baseGameId;
    }

    public void setBaseGameId(int baseGameId) {
        this.baseGameId = baseGameId;
    }

    @Basic
    @Column(name = "added_players_num", nullable = true)
    public Integer getAddedPlayersNum() {
        return addedPlayersNum;
    }

    public void setAddedPlayersNum(Integer addedPlayersNum) {
        this.addedPlayersNum = addedPlayersNum;
    }

    @Basic
    @Column(name = "added_playtime", nullable = true)
    public Integer getAddedPlaytime() {
        return addedPlaytime;
    }

    public void setAddedPlaytime(Integer addedPlaytime) {
        this.addedPlaytime = addedPlaytime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExpansionDetailsEntity that = (ExpansionDetailsEntity) o;
        return expansionDetailsId == that.expansionDetailsId &&
                productId == that.productId &&
                baseGameId == that.baseGameId &&
                Objects.equals(addedPlayersNum, that.addedPlayersNum) &&
                Objects.equals(addedPlaytime, that.addedPlaytime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(expansionDetailsId, productId, baseGameId, addedPlayersNum, addedPlaytime);
    }

    @Override
    public int giveId() {
        return expansionDetailsId;
    }
}
